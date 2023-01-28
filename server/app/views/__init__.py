from flask import Blueprint


def parse_dict(d: dict, exclude: list = [], cascade_exclude: list = []) -> dict:
  if isinstance(d, dict):
    return {k: parse_dict(v, cascade_exclude=cascade_exclude) for k, v in d.items() if k not in exclude + cascade_exclude}
  elif isinstance(d, list):
    return [parse_dict(v) for v in d]
  else:
    return str(d)


bl = Blueprint('api', __name__)
from .api import bl # register routes
from .api_doc import bl # continue register routes...
from .api_test import bl
from .api_security import bl

api = bl