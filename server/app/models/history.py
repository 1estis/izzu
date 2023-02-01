
from __future__ import annotations
from datetime import datetime as dt, timedelta
from fractions import Fraction
from app import db
from . import security as sec
from .content import Content


class Weight(db.EmbeddedDocument):
  id: int = db.SequenceField(primary_key=True)
  unit: Content = db.ReferenceField(Content, required=True)
  numinator: int = db.IntField(required=True, min_value=1, max_value=999_999)
  denominator: int = db.IntField(required=True, min_value=1, max_value=999_999)
  
  @property
  def weight(self) -> Fraction:
    return Fraction(self.numinator, self.denominator)
  
  @weight.setter
  def weight(self, value: Fraction):
    self.numinator, self.denominator = value.numerator, value.denominator


class Weights(db.Document):
  '''Scales of content for user
  
  How much user likes content relative to other content.
  Used to calculate royalty allocation.
  :param user: user
  :param time: time of weights
  :param weights: weight of content'''
  id: int = db.SequenceField(primary_key=True)
  user: sec.User = db.ReferenceField('sec.User', required=True)
  time: dt = db.DateTimeField(required=True, default=dt.now)
  weights: list[Weight] = db.ListField(db.EmbeddedDocumentField(Weight))
  
  def save(self, *args, **values):
    # ignore weights with zero value or if user has not viewed content in allocation time
    super().save(*args, **values)


class View(db.Document):
  id: int = db.SequenceField(primary_key=True)
  user: sec.User = db.ReferenceField('sec.User', required=True)
  content: Content = db.ReferenceField(Content, required=True)
  start_time: dt = db.DateTimeField(required=True)
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
  numinator: int = db.IntField(required=True)
  denominator: int = db.IntField(required=True)
  _view_time: float = db.FloatField(required=True)
  
  @property
  def amount(self) -> Fraction:
    return Fraction(self.numinator, self.denominator)
  
  @amount.setter
  def amount(self, value: Fraction):
    self.numinator, self.denominator = value.numerator, value.denominator
  
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
  numinator: int = db.IntField(required=True)
  denominator: int = db.IntField(required=True)
  allocation_area_start: dt = db.DateTimeField(required=True)
  allocation_area_end: dt = db.DateTimeField(required=True)
  royaltys: list[Royalty] = db.ListField(db.EmbeddedDocumentField(Royalty))
  
  @property
  def amount(self) -> Fraction:
    return Fraction(self.numinator, self.denominator)
  
  @amount.setter
  def amount(self, value: Fraction):
    self.numinator, self.denominator = value.numerator, value.denominator