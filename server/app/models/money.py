from __future__ import annotations
from datetime import datetime as dt, timedelta
from fractions import Fraction

from app import db, RAI, RAR, SERVICE_FEE
from .history import Allocation, Royalty, View, Weights
from . import security as sec
from .tools import Task
from .dicts import Currency


class Payment(db.EmbeddedDocument):
  currency: Currency = db.ReferenceField(Currency, required=True)
  numerator: int = db.IntField(required=True)
  denominator: int = db.IntField(required=True)
  time: dt = db.DateTimeField(required=True)
  cheque: bytes = db.BinaryField(required=True, default=b'')
  cheque_url: str = db.StringField(required=True, default='')
  
  @property
  def amount(self) -> Fraction:
    return Fraction(self.numerator, self.denominator)
  
  @amount.setter
  def amount(self, value: Fraction):
    self.numerator, self.denominator = value.numerator, value.denominator


class SubscriptionFragment(db.EmbeddedDocument):
  meta = {'indexes': ['time', 'executed']}
  id: int = db.SequenceField(primary_key=True)
  numerator: int = db.IntField(required=True)
  denominator: int = db.IntField(required=True)
  start: dt = db.DateTimeField(required=True)
  end: dt = db.DateTimeField(required=True)
  allocated: bool = db.BooleanField(required=True, default=False)
  
  @property
  def amount(self) -> Fraction:
    return Fraction(self.numerator, self.denominator)
  
  @amount.setter
  def amount(self, value: Fraction):
    self.numerator, self.denominator = value.numerator, value.denominator
  
  def allocate(self) -> None:
    '''Allocate fragment of subscription'''
    if self.allocated: raise Exception('Fragment already allocated')
    
    _now = dt.now()
    if _now < self.atime: raise Exception(f'Fragment can be allocated only after {self.atime}')
    
    start, end = self.allocation_area
    views: list[View] = View.objects(user=self._instance._instance, start_time__gte=start, start_time__lt=end)
    
    if not views:
      # TODO: what if user has no views in distribution time?
      self.allocated = True
      return
    
    weights: Weights = Weights.objects(user=self._instance._instance, time__lte=end).order_by('-time').first()
    
    # Unite views with same content (we need sum their view times)
    royaltys: dict[str, Royalty] = {}
    for view in views:
      if view.content.code not in royaltys:
        royaltys[view.content.code] = Royalty(
          content=view.content,
          view_time=view.duration
        )
      else:
        royaltys[view.content.code].view_time += view.duration
    
    total_view_time = sum(royalty._view_time for royalty in royaltys.values())
    
    royaltys_weights: list[tuple[Royalty, Fraction]] = []
    weights_sum = Fraction(0)
    
    # Calculate royalties
    for royalty in royaltys.values():
      weight = Fraction(1)
      for w in weights.weights:
        if w.unit == royalty.content:
          weight = w.weight
          break
      royaltys_weights.append((royalty, weight))
      weights_sum += weight
    
    royaltys_combined_coefficients = [
      (royalty, Fraction(Fraction(royalty._view_time), Fraction(total_view_time)) * weight / weights_sum)
      for royalty, weight in royaltys_weights
    ]
    total_combined_coefficient = sum(combined_coefficient for _, combined_coefficient in royaltys_combined_coefficients)
    
    for royalty, combined_coefficient in royaltys_combined_coefficients:
      royalty.amount = self.amount * combined_coefficient / total_combined_coefficient
      
      royalty.content.add_royalty_amount(self._instance.payment.currency, royalty.amount)
    
    
    if (_sum := sum(royalty.amount for royalty in royaltys.values())) != self.amount:
      raise Exception('Sum of royalties is not equal to amount of subscription fragment'
        f'Sum: {_sum}, amount: {self.amount}'
      )
    
    Allocation(
      user=self._instance._instance,
      time=_now,
      currency=self._instance.payment.currency,
      amount=self.amount,
      royalties=royaltys.values(),
      allocation_area_start=start,
      allocation_area_end=end
    ).save()
    
    self.allocated = True
  
  @property
  def allocation_area(self):
    return self.start - RAR, self.end + RAR
  
  @property
  def atime(self):
    '''Allocation time, time when amount will be allocated'''
    return self.end + RAR


class Subscription(db.EmbeddedDocument):
  '''Subscription model. Call calculate_fragments() once after creating a new subscription.'''
  id: int = db.SequenceField(primary_key=True)
  payment: Payment = db.EmbeddedDocumentField(Payment, required=True)
  start: dt = db.DateTimeField(required=True)
  end: dt = db.DateTimeField(required=True)
  fragments: list[SubscriptionFragment] = db.ListField(db.EmbeddedDocumentField(SubscriptionFragment), default=[])
  
  def allocate_next_fragment(self) -> None:
    '''Allocate next fragment of subscription'''
    if fragment := self.next_unallocated_fragment():
      fragment.allocate()
  
  def calculate_fragments(self):
    amount = self.payment.amount * (1 - SERVICE_FEE)
    self.fragments = []
    
    if residial := (duration := self.end - self.start) % RAI:
      amount_residial = amount * Fraction(Fraction(residial.total_seconds()), Fraction(RAI.total_seconds()))
      amount -= amount_residial
    
    for i in range(duration // RAI):
      self.fragments.append(SubscriptionFragment(
        amount=amount,
        start=self.start + i * RAI,
        end=self.start + (i + 1) * RAI,
      ))
    
    if amount_residial:
      self.fragments.append(SubscriptionFragment(
        amount=amount_residial,
        start=self.end - residial,
        end=self.end,
      ))
    
    return self
  
  def fragment(self, time: dt) -> SubscriptionFragment | None:
    '''Return fragment of subscription at time. Return None if time is out of subscription range.'''
    for fragment in self.fragments:
      if fragment.start <= time < fragment.end:
        return fragment
    return None

  def split(self, time: dt = dt.now()) -> tuple[Subscription | None, Subscription | None]:
    '''Split subscription into two subscriptions. Return tuple of new subscriptions.
    If time is before start of subscription, return subscription and None.
    If time is after end of subscription, return None and subscription.'''
    
    if time < self.start: return self, None
    if time > self.end: return None, self
    
    fragments1: list[SubscriptionFragment] = []
    fragments2: list[SubscriptionFragment] = []
    
    for fragment in self.fragments:
      if fragment.start < time:
        fragments1.append(fragment)
      else:
        fragments2.append(fragment)
    
    self.fragments = fragments1
    self.end = fragments1[-1].end
    
    subscription2 = Subscription(
      payment=self.payment,
      start=fragments2[0].start,
      end=fragments2[-1].end,
      fragments=fragments2,
    )
    
    return self, subscription2
  
  def next_atime(self, time: dt = dt.now()) -> dt | None:
    '''Next distribution time after time'''
    
    if self.final_atime() < time: return None
    
    for fragment in self.fragments:
      if (atime := fragment.atime) > time:
        return atime
  
  def previous_atime(self, time: dt = dt.now()) -> dt | None:
    '''Previous distribution time before time'''
    
    if self.start > time: return None
    
    for fragment in reversed(self.fragments):
      if (atime := fragment.atime) < time:
        return atime
  
  def final_atime(self) -> dt:
    return self.fragments[-1].atime
  
  def next_unallocated_fragment(self) -> SubscriptionFragment | None:
    if not self.fragments: raise Exception('Subscription has no fragments, you should call calculate_fragments() for subscription after creating it')
    if self.fragments[-1].allocated: return None
    for fragment in self.fragments:
      if not fragment.allocated:
        return fragment
  
  def move_to(self, time: dt):
    '''Move subscription to time'''
    self.move(time - self.start)
  
  def move(self, timedelta: timedelta):
    self.start += timedelta
    self.end += timedelta
    for fragment in self.fragments:
      fragment.start += timedelta
      fragment.end += timedelta


class Allocate(Task):
  user: sec.User = db.ReferenceField('sec.User', required=True)
  
  def do(self) -> None:
    self.user.allocate_next_fragment()
    self.delete()