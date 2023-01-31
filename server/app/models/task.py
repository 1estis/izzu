from __future__ import annotations
from datetime import datetime as dt
from time import sleep
from app import db

class Task(db.Document): # TODO: rewrite it completely
  id: int = db.SequenceField(primary_key=True)
  time: dt = db.DateTimeField(required=True)
  action: str = db.StringField(required=True)
  
  def __unicode__(self) -> str:
    return f'{self.time} {self.action}'
  
  def do(self, env: dict = {}) -> any:
    result = eval(self.action, env)
    self.delete()
    return result
  
  @classmethod
  def next(cls) -> Task | None:
    return cls.objects.order_by('time').first()
  
  @classmethod
  def run_handler(cls, env: dict = {}):
    while True:
      if task := cls.next() and task.time <= dt.now():
        task.do(env)
      else:
        sleep(task.time - dt.now())