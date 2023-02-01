from __future__ import annotations
from flask import redirect, url_for
from flask_login import current_user
from flask_security.utils import hash_password

from datetime import datetime as dt

from .. import user_datastore
from . import bl

from ..models.security import User
from ..models.content import ContentType
from ..models.dicts import Language

current_user: User


@bl.before_app_first_request
def init():
  if not user_datastore.get_user('admin@self.com'):
    user_datastore.create_role(name="admin")
    user_datastore.create_user(
      username='admin',
      email='admin@self.com',
      confirmed_at=dt.now(),
      password=hash_password('vxtr5w7c_nxd'),
      roles=['admin']
    )
  if not Language.default:
    en: Language = Language(code='en_US')
    ru: Language = Language(code='ru_RU')
    kz: Language = Language(code='kk_KZ')
    en.set_title(en, 'English', False)
    en.set_title(ru, 'Английский', False)
    en.set_title(kz, 'Ағылшын', False)
    ru.set_title(en, 'Russian', False)
    ru.set_title(ru, 'Русский', False)
    ru.set_title(kz, 'Орыс', False)
    kz.set_title(en, 'Kazakh', False)
    kz.set_title(ru, 'Казахский', False)
    kz.set_title(kz, 'Қазақ', False)
    en.save()
    ru.save()
    kz.save()
  if not ContentType.objects(code='movie').count():
    ContentType(code='movie')\
      .set_title(Language.default, 'Movie', False)\
      .set_title(Language.default, 'Movies', False, True)\
      .save()
  if not ContentType.objects(code='series').count():
    ContentType(code='series')\
      .set_title(Language.default, 'Series', False)\
      .set_title(Language.default, 'Series', False, True)\
      .save()
  if not ContentType.objects(code='anime').count():
    ContentType(code='anime')\
      .set_title(Language.default, 'Anime', False)\
      .set_title(Language.default, 'Anime', False, True)\
      .save()
  pass


@bl.route('/')
def home():
  return redirect(url_for('api.api_doc'))