from __future__ import annotations
from flask import Blueprint, make_response, redirect, render_template, render_template_string, url_for, request, flash, jsonify, abort, send_from_directory
from flask_security import login_required, current_user, login_user, logout_user, roles_required, roles_accepted
from flask_security.utils import verify_password, hash_password

from datetime import datetime as dt
from flask import current_app as app

from ..models.security import User
from ..models.content import Content, ContentType
from ..models.tools import Language
import os

api = Blueprint('api', __name__)


@api.before_app_first_request
def init():
  if not app.user_datastore.get_user('admin@self.com'):
    app.user_datastore.create_role(name="admin")
    app.user_datastore.create_user(
      # username='admin',
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


@api.route('/')
def home():
  # return api docs
  return {
    'api': [
      '/api/user',
      '/api/login',
    ]
  }


@api.route('/client')
def client():
  return render_template_string('''
    <button onclick='login()'>Login</button>

    <script>
      function login() {
        fetch('/api/login?email=admin@self.com&password=vxtr5w7c_nxd')
          .then(response => response.json())
          .then(data => console.log(data));
      }
    </script>
  ''')


@api.route('/api/user')
def user():
  print(current_user)
  return {
    'request.args': request.args,
    'dir(user)': dir(current_user),
    'is_authenticated': current_user.is_authenticated,
    'is_active': current_user.is_active,
    'is_anonymous': current_user.is_anonymous,
    'get_id': current_user.get_id(),
    'roles': current_user.roles,
  }


@api.route('/api/login')
def login():
  print(request.args)
  email = request.args.get('email')
  password = request.args.get('password')
  if not email or not password: return abort(400)
  user: User | None = app.user_datastore.get_user(email)
  if not user: return abort(401)
  if not verify_password(password, user.password): return abort(401)
  if not login_user(user, remember=True): return abort(401)
  return make_response(jsonify({
    'user': {
      'email': user.email,
      'roles': user.roles,
      'is_authenticated': user.is_authenticated,
      'is_active': user.is_active,
      'is_anonymous': user.is_anonymous,
      'get_id': user.get_id(),
      'auth_token': user.get_auth_token(),
    }
  }), 200)