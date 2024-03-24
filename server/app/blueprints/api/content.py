from __future__ import annotations
from mongoengine.queryset.base import BaseQuerySet
from flask_security.decorators import roles_required
from app.models.content import Content
from flask import request
from ..utils import abort
from . import bl


@bl.get('/content/list')
def content_list():
  print(request.args)
  try:
    _list: BaseQuerySet = Content.objects(**request.args) # type: ignore
    return _list.to_json()
  except Exception as e:
    return abort(500, str(e))


@bl.post('/content/add')
@roles_required('admin')
def content_add():
  try:
    content = Content(**request.args)
    content.save()
    return content.to_json()
  except Exception as e:
    return abort(500, str(e))