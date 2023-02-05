from datetime import timedelta, datetime as dt
from secrets import token_urlsafe
from threading import Thread

from flask import copy_current_request_context, url_for
from flask_mailing import Message
from app import mail, db
from app.models.tools import Task
from app.models.security import User


def generate_code(length: int = 64) -> str:
  '''Generate a random code.'''
  return token_urlsafe(length)


class ConfirmEmail(Task):
  '''Confirmation email for user.'''
  code: str = db.StringField(required=True, default=generate_code)
  user: User = db.ReferenceField(User, required=True)
  meta = {'indexes': ['code']}
  
  def do(self):
    self.delete()
  
  @classmethod
  def new(cls, user: User, link: str | None):
    if obj := cls.objects(user=user).first(): obj.delete()
    obj = cls(user=user, time=dt.now() + timedelta(days=1))
    link = f'{link}/{obj.code}' if link else \
      f'{url_for("ui.confirm_email", code=obj.code, _external=True)}'
    obj.send(link)
    obj.save()
  
  def send(self, link: str):
    msg = Message(
      subject=f'Confirm your email',
      recipients=[self.user.email],
      body=f'Confirm your email:\n{link}',
    )
    Thread(
      target=copy_current_request_context(mail.send_message),
      args=(msg,)
    ).start()
  
  @classmethod
  def confirm(cls, code: str):
    confirm_email: ConfirmEmail | None = cls.objects(code=code).first()
    if not confirm_email or confirm_email.time < dt.now(): return False
    confirm_email.user.confirmed = dt.now()
    confirm_email.user.save()
    confirm_email.delete()
    return True


class ResetPassword(Task):
  '''Reset password task.'''
  code: str = db.StringField(required=True)
  user: User = db.ReferenceField(User, required=True)
  meta = {'indexes': ['code']}
  
  def do(self):
    self.delete()
  
  @classmethod
  def new(cls, user: User, link: str | None):
    if obj := cls.objects(user=user).first(): obj.delete()
    obj = cls(user=user, code=generate_code(), time=dt.now() + timedelta(days=1))
    link = f'{link}/{obj.code}' if link else \
      f'{url_for("ui.reset_password", code=obj.code, _external=True)}'
    obj.send(link)
    obj.save()
  
  def send(self, link: str):
    msg = Message(
      subject=f'Reset your password',
      recipients=[self.user.email],
      body=f'Reset your password:\n{link}',
    )
    Thread(
      target=copy_current_request_context(mail.send_message),
      args=(msg,)
    ).start()
  
  @classmethod
  def reset(cls, code: str, password: str):
    reset_password: ResetPassword | None = cls.objects(code=code).first()
    if not reset_password or reset_password.time < dt.now(): return False
    reset_password.user.password = password
    reset_password.user.save()
    reset_password.delete()
    return True