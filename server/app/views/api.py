from __future__ import annotations
from flask import Blueprint, Response, make_response, redirect, render_template_string, url_for, flash, abort, send_from_directory
from flask_login import fresh_login_required
from flask_security import MongoEngineUserDatastore, login_required, current_user, login_user, logout_user, roles_accepted
from flask_security.utils import verify_password, hash_password

from datetime import datetime as dt
from flask import current_app as app, request

from ..models.security import User
from ..models.content import ContentType
from ..models.tools import Language

api = Blueprint('api', __name__)
user_datastore: MongoEngineUserDatastore = app.user_datastore
current_user: User


def parse_dict(d: dict, exclude: list = []) -> dict:
  if isinstance(d, dict):
    return {k: parse_dict(v) for k, v in d.items() if k not in exclude}
  elif isinstance(d, list):
    return [parse_dict(v) for v in d]
  else:
    return str(d)


@api.before_app_first_request
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


@api.route('/')
def home():
  return redirect(url_for('api.api_docs'))


@api.route('/api')
def api_docs():
  # return api docs
  return {
    'api': {
      url_for('api.user'): {
        'GET': {
          'description': 'Get current user',
        },
        'POST': {
          'description': 'Edit current user',
          'allowed_fields_for_edit': User.allowed_fields_for_edit,
        },
      },
      url_for('api.register'): {
        'POST': {
          'description': 'Register',
          'fields': {
            'username': {
              'required': False,
              'type': 'string',
            },
            'email': {
              'required': True,
              'type': 'string',
            },
            'password': {
              'required': True,
              'type': 'string',
            },
          },
        },
      },
      url_for('api.login'): {
        'POST': {
          'description': 'Login',
          'fields': {
            'email': {
              'required': True,
              'type': 'string',
            },
            'password': {
              'required': True,
              'type': 'string',
            },
          },
        },
      },
      url_for('api.logout'): {
        'POST': {
          'description': 'Logout',
        },
      },
      url_for('api.change_password'): {
        'PUT': {
          'description': 'Change password',
          'fields': {
            'current_password': {
              'required': True,
              'type': 'string',
            },
            'new_password': {
              'required': True,
              'type': 'string',
            },
          },
        },
      },
    }
  }


@api.route('/api/test')
def test():
  return render_template_string('''
    <button onclick='user()'>User (GET)</button>
    <button onclick='login()'>Login (POST)</button>
    <button onclick='logout()'>Logout (POST)</button>
    <button onclick='change_password()'>Change password (PUT)</button>
    
    <div id='result'></div>

    <script>
      function user() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/user', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function () {
          console.log(this);
          console.log(this.responseText);
          document.getElementById('result').innerHTML = this.responseText;
        };
        xhr.send();
      }
      function login() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
          console.log(this.responseText);
          document.getElementById('result').innerHTML = this.responseText;
        };
        xhr.send(JSON.stringify({
          email: 'admin@self.com',
          password: 'vxtr5w7c_nxd',
        }));
      }
      function logout() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/logout', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
          console.log(this.responseText);
          document.getElementById('result').innerHTML = this.responseText;
        };
        xhr.send();
      }
      function change_password() {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', '/api/change_password', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function () {
          console.log(this.responseText);
          document.getElementById('result').innerHTML = this.responseText;
        };
        xhr.send(JSON.stringify({
          current_password: 'vxtr5w7c_nxd',
          new_password: 'vxtr5w7c_nxd',
        }));
      }
    </script>
  ''')


@api.route('/api/user', methods=['GET'])
def user():
  res = {
    'message': 'user',
    'user': parse_dict(current_user.to_mongo().to_dict(), exclude=['password']),
  }
  return res


@api.route('/api/login', methods=['POST'])
@fresh_login_required
def login():
  for key, value in request.json.items():
    if key not in User.allowed_fields_for_edit: return abort(400, f'{key} is not allowed to update')
    setattr(current_user, key, value)
  current_user.save()
  return { 'message': 'user updated' }


@api.route('/api/register', methods=['POST'])
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


@api.route('/api/login', methods=['POST'])
def login():
  email = request.json.get('email')
  password = request.json.get('password')
  if not email or not password: return abort(400, 'email or password is missing')
  user: User | None = user_datastore.get_user(email)
  if not user: return abort(401, 'user not found')
  if not verify_password(password, user.password): return abort(401, 'password is incorrect')
  if not login_user(user, remember=True): return abort(500, 'login failed')
  return {
    'message': 'login',
  }


@api.route('/api/logout', methods=['POST'])
def logout():
  logout_user()
  return {
    'message': 'logout',
  }


@api.route('/api/change_password', methods=['PUT'])
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