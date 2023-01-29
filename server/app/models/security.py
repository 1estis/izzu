from __future__ import annotations
from datetime import datetime as dt, timedelta
from flask_security import UserMixin, RoleMixin
from app import db
from .content import Weight
from .money import Payment, Subsctiption


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
  view_waights: list[Weight] = db.ListField(db.EmbeddedDocumentField(Weight), default=[])
  
  def __unicode__(self) -> str: return self.username
  
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
  
  def subscribe(self, payment: Payment, duration: timedelta):
    _sed = self.subscribtion_end_date
    if not _sed or _sed < dt.now(): _sed = dt.now()
    self.subscribtions.append(Subsctiption(payment=payment, start=_sed, end=_sed+duration))
    # TODO: handle view_time
    # TODO: handle distributions
  
  def pause_subscribtion(self):
    if self.subscribtion_pause_start: return
    self.subscribtion_pause_start = dt.now()
  
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
    self.subscribtion_pause_start = None