from __future__ import annotations
from datetime import datetime as dt, timedelta
from decimal import Decimal
from flask_security import UserMixin, RoleMixin
from app import db, DISTRIBUTION_INTERVAL
from .history import View
from .content import Content
from .money import Distribution, Payment, Subsctiption


class Role(db.Document, RoleMixin):
  name: str = db.StringField(max_length=80, primary_key=True)
  description: str = db.StringField(max_length=255)
  
  def __unicode__(self) -> str:
    return self.name


class User(db.Document, UserMixin):
  active: bool = db.BooleanField(default=True)
  username: str = db.StringField(max_length=80, required=True)
  email: str = db.StringField(max_length=255, required=True, unique=True)
  password: str = db.StringField(max_length=255, required=True)
  roles: list = db.ListField(db.ReferenceField(Role), default=[])
  confirmed_at: dt | None = db.DateTimeField(default=None)
  _view_time: float = db.FloatField(required=True, default=0)
  subscribtions: list[Subsctiption] = db.ListField(db.EmbeddedDocumentField(Subsctiption), default=[])
  subscribtion_pause_start: dt | None = db.DateTimeField(default=None)
  
  def __unicode__(self) -> str: return self.username
  
  def views_for_distribution(self, distribution: Distribution) -> list[View]:
    # increase distribution_interval by sum of all pauses that are in distribution_interval
    distribution_start = distribution.time - DISTRIBUTION_INTERVAL
    for subscribtion in self.subscribtions[::-1]:
      if subscribtion.end < distribution_start: break
      for pause in subscribtion.pauses[::-1]:
        if pause[0] < distribution_start: break
        distribution_start -= pause[1] - pause[0]
    return View.objects(user=self, start_time__gte=distribution_start, start_time__lt=distribution.time)
  
  @property
  def last_subscribtion(self) -> Subsctiption | None:
    return self.subscribtions[-1] if self.subscribtions else None
  
  @property
  def subscribed(self):
    if self.subscribtion_pause_start: return False
    if not self.last_subscribtion: return False
    return self.last_subscribtion.end > dt.now()
  
  @property
  def subscribtion_end_date(self):
    return self.last_subscribtion.end if self.last_subscribtion else self.subscribtion_pause_start
  
  @property
  def continuous_subscribtions(self):
    if not self.subscribed: return []
    result: list[Subsctiption] = []
    _1day = timedelta(days=1)
    for subscribtion in self.subscribtions:
      if not result or subscribtion.start - result[-1].end < _1day:
        result.append(subscribtion)
      else: break
    return result

  @property
  def view_time(self) -> timedelta:
    return timedelta(seconds=self._view_time)
  
  @view_time.setter
  def view_time(self, value: timedelta):
    self._view_time = value.total_seconds()
  
  def add_view(self, content: Content, view_time: timedelta, time: dt = dt.now()):
    last_view: View = View.objects(user=self, content=content).order_by('-start_time').first()
    last_distribution = Distribution.prev(self, time)
    last_distribution_time = last_distribution.time if last_distribution else dt.min
    if last_view and last_view.start_time > last_distribution_time:
      last_view.view_time += view_time
      last_view.save()
    else:
      View(user=self, content=content, start_time=time, view_time=view_time).save()
    
    self.view_time -= view_time
    self.save()
  
  def subscribe(self, payment: Payment, duration: timedelta):
    sed = self.subscribtion_end_date
    if not sed or sed < dt.now(): sed = dt.now()
    self.subscribtions.append(Subsctiption(payment=payment, start=sed, end=sed+duration))
    self.view_time += duration / 2
    residual = duration % timedelta(days=1)
    amount = Decimal(payment.amount)
    
    if residual:
      amount_residual: Decimal = Decimal(payment.amount) * (residual / duration)
      amount -= amount_residual
      Distribution(
        time = sed + duration + timedelta(days = 30),
        user = self,
        currency = payment.currency,
        amount = amount_residual
      ).save()
    
    amount_per_day = amount / duration.days
    for day in range(1, duration.days + 1):
      Distribution(
        time = sed+timedelta(days = day + 30),
        user = self,
        currency = payment.currency,
        amount = amount_per_day
      ).save()
    self.save()
  
  def pause_subscribtion(self):
    if self.subscribtion_pause_start: return
    self.subscribtion_pause_start = dt.now()

    # pause all distributions
    for distribution in Distribution.objects(user=self, time__gte=self.subscribtion_pause_start):
      distribution: Distribution
      distribution.pause = True
      distribution.save()
    
    self.save()  
  
  def resume_subscribtion(self):
    if not self.subscribtion_pause_start: return
    _now = dt.now()
    pause_duration = _now - self.subscribtion_pause_start
    for subscribtion in self.subscribtions:
      if subscribtion.end > self.subscribtion_pause_start:
        subscribtion.end += pause_duration
        if subscribtion.start > self.subscribtion_pause_start:
          subscribtion.start += pause_duration
        else: subscribtion.pauses.append((self.subscribtion_pause_start, _now))
    
    # resume all distributions
    for distribution in Distribution.objects(user=self, time__gte=_now):
      distribution: Distribution
      distribution.time += pause_duration
      distribution.pause = False
      distribution.save()
    
    self.subscribtion_pause_start = None
    self.save()