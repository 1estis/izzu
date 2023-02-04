from flask import request
from flask_security import login_user, logout_user, current_user
from flask_security.utils import verify_password, hash_password

from ..models.security import User
from .. import user_datastore
from . import bl, parse_dict, login_required, fresh_login_required, abort

current_user: User


@bl.route('/user', methods=['GET'])
def user():
  res = {
    'message': 'user',
    'user':
      parse_dict(current_user.to_mongo().to_dict(), exclude=('password',))
      if current_user.is_authenticated else None,
  }
  return res


@bl.route('/user', methods=['POST'])
@fresh_login_required
def user_edit():
  username = request.json.get('username')
  if username: current_user.username = username
  else: return abort(400, 'username is missing')
  current_user.save()
  return { 'message': 'user updated' }


@bl.route('/register', methods=['POST'])
def register():
  email = request.json.get('email')
  password = request.json.get('password')
  if not (email and password): return abort(400, 'email or password is missing')
  user: User | None = user_datastore.get_user(email)
  if user: return abort(409, 'user already exists')
  user = user_datastore.create_user(
    username=email,
    email=email,
    password=hash_password(password),
  )
  if not login_user(user, remember=True): return abort(500, 'login failed')
  return {
    'message': 'register',
  }


@bl.route('/login', methods=['POST'])
def login():
  if current_user.is_authenticated: return abort(302, 'already logged in')
  email = request.json.get('email')
  password = request.json.get('password')
  if not email or not password: return abort(400, 'email or password is missing')
  user: User | None = user_datastore.get_user(email)
  if not (user and verify_password(password, user.password)): return abort(401, 'email or password is incorrect')
  if not login_user(user, remember=True): return abort(500, 'login failed')
  return {
    'message': 'login',
  }


@bl.route('/logout', methods=['POST'])
def logout():
  logout_user()
  return {
    'message': 'logout',
  }


@bl.route('/change_password', methods=['PUT'])
@login_required
def change_password():
  password = request.json.get('current_password')
  new_password = request.json.get('new_password')
  if not password or not new_password: return abort(400, 'password or new_password is missing')
  if not verify_password(password, current_user.password): return abort(401, 'password is incorrect')
  current_user.password = hash_password(new_password)
  current_user.save()
  return {
    'message': 'password changed',
  }