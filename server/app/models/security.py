from datetime import datetime as dt
from flask_security import UserMixin, RoleMixin
from app import db


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
  confirmed_at: dt = db.DateTimeField(default=None)
  subscribtion_end_date: dt = db.DateTimeField(default=None)
  
  def is_subscribed(self) -> bool:
    return self.subscribtion_end_date and self.subscribtion_end_date > dt.now()
  
  def without_password(self):
    self_copy: User = User.objects.get(id=self.id)
    self_copy.password = '<hidden>'
    self_copy.save = None
    return self_copy