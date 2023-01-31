from __future__ import annotations
from datetime import datetime as dt, timedelta
from decimal import Decimal

from app import db, RDI, RDR, SERVICE_FEE
from .dicts import Currency


class Payment(db.EmbeddedDocument):
  currency: Currency = db.ReferenceField(Currency, required=True)
  amount: Decimal = db.DecimalField(required=True)
  time: dt = db.DateTimeField(required=True)
  cheque: bytes = db.BinaryField(required=True, default=b'')
  cheque_url: str = db.StringField(required=True, default='')


class SubscriptionFragment(db.EmbeddedDocument):
  meta = {'indexes': ['time', 'executed']}
  id: int = db.SequenceField(primary_key=True)
  amount: Decimal = db.DecimalField(required=True)
  start: dt = db.DateTimeField(required=True)
  end: dt = db.DateTimeField(required=True)
  distributed: bool = db.BooleanField(required=True, default=False)
  
  def distribution_area(self):
    return self.start - RDR, self.end + RDR
  
  def dtime(self):
    '''Distribution time, time when amount will be distributed'''
    return self.end + RDR


class Subscription(db.EmbeddedDocument):
  '''Subscription model. Call calculate_fragments() once after creating a new subscription.'''
  id: int = db.SequenceField(primary_key=True)
  payment: Payment = db.EmbeddedDocumentField(Payment, required=True)
  start: dt = db.DateTimeField(required=True)
  end: dt = db.DateTimeField(required=True)
  fragments: list[SubscriptionFragment] = db.ListField(db.EmbeddedDocumentField(SubscriptionFragment), default=[])
  
  def calculate_fragments(self):
    amount = self.payment.amount * (1 - SERVICE_FEE)
    self.fragments = []
    
    if residial := (duration := self.end - self.start) % RDI:
      amount_residial = amount * (Decimal(residial.total_seconds()) / Decimal(RDI.total_seconds()))
      amount -= amount_residial
    
    for i in range(duration // RDI):
      self.fragments.append(SubscriptionFragment(
        amount=amount,
        start=self.start + i * RDI,
        end=self.start + (i + 1) * RDI,
      ))
    
    if residial:
      self.fragments.append(SubscriptionFragment(
        amount=amount_residial,
        start=self.end - residial,
        end=self.end,
      ))
    
    return self

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
  
  def next_dtime(self, time: dt = dt.now()) -> dt | None:
    '''Next distribution time after time'''
    
    if self.final_dtime() < time: return None
    
    for fragment in self.fragments:
      if (dtime := fragment.dtime()) > time:
        return dtime
  
  def previous_dtime(self, time: dt = dt.now()) -> dt | None:
    '''Previous distribution time before time'''
    
    if self.start > time: return None
    
    for fragment in reversed(self.fragments):
      if (dtime := fragment.dtime()) < time:
        return dtime
  
  def final_dtime(self) -> dt:
    return self.fragments[-1].dtime()
  
  def next_undistributed_fragment(self) -> SubscriptionFragment | None:
    for fragment in self.fragments:
      if not fragment.distributed:
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