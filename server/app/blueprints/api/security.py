from flask import request
from flask_security import login_user, logout_user, current_user
from flask_security.utils import verify_password, hash_password

from app import user_datastore
from app.models import User, ConfirmEmail, ResetPassword
from app.blueprints.utils import parse_dict, abort, fresh_login_required, \
  login_required
from . import bl

current_user: User


@bl.get('/user')
def user():
  res = {
    'message': 'user',
    'user':
      parse_dict(current_user.to_mongo().to_dict(), exclude=('password',))
      if current_user.is_authenticated else None,
  }
  return res


@bl.put('/user')
@fresh_login_required
def user_edit():
  username = request.json.get('username')
  if username: current_user.username = username
  else: return abort(400, 'username is missing')
  current_user.save()
  return { 'message': 'user updated' }


@bl.post('/register')
def register():
  if current_user.is_authenticated: return abort(302, 'already logged in')
  email = request.json.get('email')
  password = request.json.get('password')
  if not (email and password):
    return abort(400, 'email or password is missing')
  user: User = user_datastore.find_user(email=email)
  if user: return abort(409, 'user already exists')
  
  user = user_datastore.create_user(
    username=email,
    email=email,
    password=hash_password(password),
  )
  
  ConfirmEmail.new(user=user, link=request.json.get('link'))
  
  if not login_user(user, remember=True): return abort(500, 'login failed')
  return {
    'message': 'register',
  }


@bl.post('/send_confirm_email')
@login_required
def send_confirm_email():
  if current_user.confirmed: return abort(409, 'email already confirmed')
  ConfirmEmail.new(user=current_user, link=request.json.get('link'))
  return {
    'message': 'confirmation email sent',
  }


@bl.post('/confirm_email')
def confirm_email():
  token = request.json.get('token')
  if not token: return abort(400, 'token is missing')
  if ConfirmEmail.confirm(token):
    return {
      'message': 'email confirmed',
    }
  else:
    return abort(404, 'confirmation token is invalid, expired or already used')


@bl.post('/login')
def login():
  if current_user.is_authenticated: return abort(302, 'already logged in')
  email = request.json.get('email')
  password = request.json.get('password')
  if not email or not password:
    return abort(400, 'email or password is missing')
  user: User = user_datastore.find_user(email=email)
  if not (user and verify_password(password, user.password)):
    return abort(401, 'email or password is incorrect')
  if not login_user(user, remember=True): return abort(500, 'login failed')
  return {
    'message': 'login',
  }


@bl.post('/logout')
# @login_required
def logout():
  logout_user()
  return {
    'message': 'logout',
  }


@bl.put('/change_password')
@login_required
def change_password():
  password = request.json.get('password')
  new_password = request.json.get('new_password')
  if not password or not new_password:
    return abort(400, 'password or new_password is missing')
  if not verify_password(password, current_user.password):
    return abort(401, 'password is incorrect')
  current_user.password = hash_password(new_password)
  current_user.save()
  return {
    'message': 'password changed',
  }


@bl.post('/send_reset_password_email')
def send_reset_password_email():
  email: str | None = request.json.get('email')
  if not email: return abort(400, 'email is missing')
  user: User = user_datastore.find_user(email=email)
  if not user: return abort(404, 'user not found')
  
  ResetPassword.new(user=user, link=request.json.get('link'))
  
  return {
    'message': 'password reset link has been sent to email',
  }


@bl.put('/reset_password')
def reset_password():
  token = request.json.get('token')
  if not token: return abort(400, 'token is missing')
  password = request.json.get('password')
  if not password: return abort(400, 'password is missing')
  if ResetPassword.reset(token, hash_password(password)):
    return {
      'message': 'password reset',
    }
  else:
    return abort(404, 'token is invalid or expired')