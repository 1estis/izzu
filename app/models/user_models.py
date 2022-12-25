from datetime import datetime as dt
from flask_security import UserMixin, RoleMixin
from app import db


class Role(db.Document, RoleMixin):
    name = db.StringField(max_length=80, unique=True, required=True)
    description = db.StringField(max_length=255)

    def __unicode__(self):
        return self.name


class User(db.Document, UserMixin):
    active = db.BooleanField(default=True)
    login = db.StringField(max_length=255, unique=True, required=True)
    email = db.StringField(max_length=255, unique=True, required=True)
    password = db.StringField(max_length=255, required=True)
    roles = db.ListField(db.ReferenceField(Role), default=[])
    confirmed_at = db.DateTimeField(default=None)
    subscribtion_end_date = db.DateTimeField(default=None)
    
    def is_subscribed(self):
        return self.subscribtion_end_date and self.subscribtion_end_date > dt.now()