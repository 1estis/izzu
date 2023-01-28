from __future__ import annotations
from datetime import datetime as dt, timedelta
from decimal import Decimal

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
  _meta = {'indexes': ['user', 'time', 'executed']}
  id: int = db.SequenceField(primary_key=True)
  user: sec.User = db.ReferenceField('sec.User', required=True)
  currency: Currency = db.ReferenceField(Currency, required=True)
  roaylty: float = db.FloatField(required=True) # in currency
  time: dt = db.DateTimeField(required=True)
  executed: bool = db.BooleanField(required=True, default=False)


class ExecutedDistribution(db.Document):
  time: dt = db.DateTimeField(required=True, primary_key=True)
  user: sec.User = db.ReferenceField('sec.User', required=True)
  currency: Currency = db.ReferenceField(Currency, required=True)
  roayltys: list[float] = db.ListField(db.FloatField, required=True) # in currency