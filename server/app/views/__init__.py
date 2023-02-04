from functools import wraps
from flask import Blueprint, request, abort
from flask_login import current_user


def parse_dict(d: dict, exclude: tuple = (), cascade_exclude: tuple = ()) -> dict:
  if isinstance(d, dict):
    return {k: parse_dict(v, cascade_exclude=cascade_exclude) for k, v in d.items() if k not in exclude + cascade_exclude}
  elif isinstance(d, list):
    return [parse_dict(v) for v in d]
  else:
    return str(d)


def abort(code: int, message: str):
  return { 'message': message }, code


def login_required(f):

  @wraps(f)
  def wrapper(*args, **kwargs):
    if not current_user.is_authenticated: return abort(401, 'login required')
    return f(*args, **kwargs)

  return wrapper


def fresh_login_required(f):

  @wraps(f)
  def wrapper(*args, **kwargs):
    if not current_user.is_authenticated: return abort(401, 'login required')
    if not current_user.fresh: return abort(401, 'fresh login required')
    return f(*args, **kwargs)

  return wrapper


bl = Blueprint('api', __name__)
from .api import bl # register routes
from .api_doc import bl # continue register routes...
from .api_test import bl
from .api_security import bl

api = bl