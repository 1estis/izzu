
from __future__ import annotations
from datetime import datetime as dt, timedelta
from app import db
from .money import Distribution
from . import security as sec
from .content import Content


class Weight(db.EmbeddedDocument):
  id: int = db.SequenceField(primary_key=True)
  unit: Content = db.ReferenceField(Content, required=True)
  weight: int = db.IntField(required=True) # max 9_999_999_999
  negative: bool = db.BooleanField(required=True, default=False)


class Weights(db.Document):
  id: int = db.SequenceField(primary_key=True)
  user: sec.User = db.ReferenceField('sec.User', required=True)
  time: dt = db.DateTimeField(required=True, default=dt.now)
  weights: list[Weight] = db.ListField(db.EmbeddedDocumentField(Weight))
  
  def __init__(self, *args, **values):
    super().__init__(*args, **values)
    # if we have weights for unviewed content by user, remove it from weights list
    dist = Distribution.next(self.user, self.time)
    if not dist: return
    views = self.user.views_for_distribution(dist)
    viewed = {view.content for view in views}
    self.weights = [weight for weight in self.weights if weight.unit in viewed]


class View(db.Document):
  id: int = db.SequenceField(primary_key=True)
  user: sec.User = db.ReferenceField('sec.User', required=True)
  content: Content = db.ReferenceField(Content, required=True)
  start_time: dt = db.DateTimeField(required=True)
  _view_time: float = db.FloatField(required=True)
  
  @property
  def view_time(self) -> timedelta:
    return timedelta(seconds=self._view_time)
  
  @view_time.setter
  def view_time(self, value: timedelta):
    self._view_time = value.total_seconds()