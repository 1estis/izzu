from __future__ import annotations
from datetime import datetime as dt
from typing import overload

from app import db
from . import security as sec
from .dicts import Currency


class Payment(db.EmbeddedDocument):
  currency: Currency = db.ReferenceField(Currency, required=True)
  amount: float = db.FloatField(required=True) # in currency
  time: dt = db.DateTimeField(required=True)
  cheque: bytes = db.BinaryField(required=True, default=b'')
  cheque_url: str = db.StringField(required=True, default='')


class Subsctiption(db.EmbeddedDocument):
  id: int = db.SequenceField(primary_key=True)
  payment: Payment = db.EmbeddedDocumentField(Payment, required=True)
  start: dt = db.DateTimeField(required=True)
  end: dt = db.DateTimeField(required=True)
  pauses: list[tuple[dt, dt]] = db.ListField(db.ListField(db.DateTimeField), default=[])


class Distribution(db.Document):
  meta = {'indexes': ['user', 'time', 'pause', 'executed']}
  id: int = db.SequenceField(primary_key=True)
  user: sec.User = db.ReferenceField('sec.User', required=True)
  currency: Currency = db.ReferenceField(Currency, required=True)
  amount: float = db.FloatField(required=True)
  time: dt = db.DateTimeField(required=True)
  pause: bool = db.BooleanField(required=True, default=False)
  executed: bool = db.BooleanField(required=True, default=False)
  
  @overload
  @classmethod
  def next(cls, user: sec.User, time: dt = dt.now()) -> Distribution | None:
    return cls.objects(user=user, time__gt=time).order_by('time').first()
  @classmethod
  def next(cls) -> Distribution | None: # oldest distribution
    return cls.objects.order_by('time').first()

  @classmethod
  def prev(cls, user: sec.User, time: dt = dt.now()) -> Distribution | None:
    return cls.objects(user=user, time__lt=time).order_by('-time').first()