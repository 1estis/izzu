
from __future__ import annotations
from datetime import datetime as dt, timedelta
from app import db
from . import security as sec
from .content import Content


class Weight(db.EmbeddedDocument):
  id: int = db.SequenceField(primary_key=True)
  unit: Content = db.ReferenceField(Content, required=True)
  weight: int = db.IntField(required=True, min_value=-999_999, max_value=999_999)


class Weights(db.Document):
  '''Weights of content for user
  
  How much user likes content relative to other content.
  Used to calculate royalty distribution.
  :param user: user
  :param time: time of weights
  :param weights: weights of content'''
  id: int = db.SequenceField(primary_key=True)
  user: sec.User = db.ReferenceField('sec.User', required=True)
  time: dt = db.DateTimeField(required=True, default=dt.now)
  weights: list[Weight] = db.ListField(db.EmbeddedDocumentField(Weight))
  
  def __init__(self, *args, **values):
    super().__init__(*args, **values)
    # ignore weights with zero value or if user has not viewed content in distribution time
    # TODO


class View(db.Document):
  id: int = db.SequenceField(primary_key=True)
  user: sec.User = db.ReferenceField('sec.User', required=True)
  content: Content = db.ReferenceField(Content, required=True)
  start_time: dt = db.DateTimeField(required=True)
  _view_time: float = db.FloatField(required=True)
  # next_dtime: dt = db.DateTimeField(required=True)
  # '''Next distribution time (time of next royalty distribution)'''
  
  @property
  def view_time(self) -> timedelta:
    return timedelta(seconds=self._view_time)
  
  @view_time.setter
  def view_time(self, value: timedelta):
    self._view_time = value.total_seconds()