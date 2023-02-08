from __future__ import annotations
from datetime import datetime as dt, timedelta
from fractions import Fraction
from app import db
from .dicts import Currency
from . import security as sec
from .content import Content


class Weight(db.EmbeddedDocument):
  id: int = db.SequenceField(primary_key=True)
  unit: Content = db.ReferenceField(Content, required=True)
  numerator: int = db.IntField(required=True, min_value=1, max_value=999_999)
  denominator: int = db.IntField(required=True, min_value=1, max_value=999_999)
  
  @property
  def weight(self) -> Fraction:
    return Fraction(self.numerator, self.denominator)
  
  def validate(self, clean=True):
    if self.numerator < 1: self.numerator = 1
    elif self.numerator > 999_999: self.numerator = 999_999
    if self.denominator < 1: self.denominator = 1
    elif self.denominator > 999_999: self.denominator = 999_999
    return super().validate(clean)


class Weights(db.Document):
  '''Weights of content for user
  
  How much user likes content relative to other content.
  Used to calculate royalty allocation.
  :param user: user
  :param time: time of weights
  :param weights: weights of content'''
  user: sec.User = db.ReferenceField('sec.User', required=True)
  time: dt = db.DateTimeField(required=True, default=dt.now)
  weights: list[Weight] = db.EmbeddedDocumentListField(Weight, required=True, default=list)
  
  def save(self, *args, **values):
    # ignore weights with zero value or if user has not viewed content in allocation time
    if fragment := self.user.fragment(self.time):
      start, end = fragment.allocation_area
      if views := View.objects(user=self.user, time__gte=start, time__lt=end): # TODO: optimize, use views from user
        views: list[Content] = [v.content for v in views]
        self.weights = [w for w in self.weights if w.unit in views]
    super().save(*args, **values)


class View(db.Document):
  user: sec.User = db.ReferenceField('sec.User', required=True)
  content: Content = db.ReferenceField(Content, required=True)
  time: dt = db.DateTimeField(required=True)
  _view_time: float = db.FloatField(required=True)
  
  @property
  def duration(self) -> timedelta:
    return timedelta(seconds=self._view_time)
  
  @duration.setter
  def duration(self, value: timedelta):
    self._view_time = value.total_seconds()


class Royalty(db.EmbeddedDocument):
  id: int = db.SequenceField(primary_key=True)
  content: Content = db.ReferenceField(Content, required=True)
  amount_numerator: int = db.IntField(required=True)
  amount_denominator: int = db.IntField(required=True)
  _view_time: float = db.FloatField(required=True)
  
  @property
  def amount(self) -> Fraction:
    return Fraction(self.amount_numerator, self.amount_denominator)
  
  @amount.setter
  def amount(self, value: Fraction):
    self.amount_numerator, self.amount_denominator = value.numerator, value.denominator
  
  @property
  def view_time(self) -> timedelta:
    return timedelta(seconds=self._view_time)
  
  @view_time.setter
  def view_time(self, value: timedelta):
    self._view_time = value.total_seconds()


class Allocation(db.Document):
  id: int = db.SequenceField(primary_key=True)
  user: sec.User = db.ReferenceField('sec.User', required=True)
  time: dt = db.DateTimeField(required=True)
  '''Time, when allocation was executed'''
  amount_numerator: int = db.IntField(required=True)
  amount_denominator: int = db.IntField(required=True)
  currency = db.ReferenceField(Currency, required=True)
  allocation_area_start: dt = db.DateTimeField(required=True)
  allocation_area_end: dt = db.DateTimeField(required=True)
  royaltys: list[Royalty] = db.EmbeddedDocumentListField(Royalty)
  
  @property
  def amount(self) -> Fraction:
    return Fraction(self.amount_numerator, self.denominator)
  
  @amount.setter
  def amount(self, value: Fraction):
    self.amount_numerator, self.denominator = value.numerator, value.denominator