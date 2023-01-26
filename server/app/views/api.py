from __future__ import annotations
from flask import Blueprint, make_response, redirect, render_template, render_template_string, url_for, request, flash, jsonify, abort, send_from_directory
from flask_login import fresh_login_required
from flask_security import login_required, current_user, login_user, logout_user, roles_required, roles_accepted
from flask_security.utils import verify_password, hash_password
from flask_wtf.csrf import generate_csrf

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
      },
      url_for('api.register'): {
        'GET': {
          'description': 'Register user',
          'params': {
            'email': 'string',
            'password': 'string',
          },
        },
      },
      url_for('api.login'): {
        'GET': {
          'description': 'Login user',
          'params': {
            'email': 'string',
            'password': 'string',
          },
        },
      },
      url_for('api.logout'): {
        'GET': {
          'description': 'Logout user',
        },
      },
      url_for('api.change_password'): {
        'GET': {
          'description': 'Change user password',
          'params': {
            'old_password': 'string',
            'new_password': 'string',
          },
        },
      },
    }
  }


@api.route('/api/test')
def test():
  return render_template_string('''
    <button onclick='test_ajax_get()'>Test AJAX GET</button>
    <button onclick='test_ajax_post()'>Test AJAX POST</button>
    <button onclick='test_ajax_put()'>Test AJAX PUT</button>

    <script>
      function test_ajax_get() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/user', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function () {
          console.log(this.responseText);
        };
        xhr.send();
      }
      function test_ajax_post() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
          console.log(this.responseText);
        };
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrf_token'));
        xhr.send(JSON.stringify({
          email: 'admin@self.com',
          password: 'vxtr5w7c_nxd',
        }));
      }
      function test_ajax_put() {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', '/api/change_password', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function () {
          console.log(this.responseText);
        };
        xhr.send(JSON.stringify({
          old_password: 'vxtr5w7c_nxd',
          new_password: 'vxtr5w7c_nxd',
        }));
      }
      function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
						}
					}
				}
				return cookieValue;
			}
    </script>
  ''')


@api.route('/api/user')
def user():
  print(current_user)
  return make_response({
    'message': 'user',
    'user': current_user.without_password().to_json() if current_user.is_authenticated else None,
  }, 200)


@api.route('/api/csrf_token')
def csrf_token():
  response = make_response('', 200)
  response.set_cookie('csrf_token', generate_csrf())
  return response


@api.route('/api/register')
def register():
  email = request.args.get('email')
  password = request.args.get('password')
  if not email or not password: return abort(400)
  user: User | None = app.user_datastore.get_user(email)
  if user: return abort(409)
  user = app.user_datastore.create_user(
    username=email,
    email=email,
    password=hash_password(password),
  )
  if not login_user(user, remember=True): return abort(401)
  return make_response({
    'auth_token': user.get_auth_token(),
    'message': 'register',
    'user': user.without_password().to_json(),
  }, 200)


@api.route('/api/login', methods=['GET', 'POST'])
def login():
  if request.method == 'GET':
    return { 'csrf_token': generate_csrf() }
  print(request.json)
  email = request.json.get('email')
  password = request.json.get('password')
  if not email or not password: return abort(400)
  user: User | None = app.user_datastore.get_user(email)
  if not user: return abort(401)
  if not verify_password(password, user.password): return abort(401)
  if not login_user(user, remember=True): return abort(401)
  return make_response({
    'auth_token': user.get_auth_token(),
    'message': 'login',
    'user': user.without_password().to_json(),
  }, 200)


@api.route('/api/logout')
def logout():
  logout_user()
  return make_response({
    'message': 'logout',
  }, 200)


@api.route('/api/change_password')
@login_required
def change_password():
  print(request.args)
  password = request.args.get('password')
  new_password = request.args.get('new_password')
  if not password or not new_password: return abort(400)
  if not verify_password(password, current_user.password): return abort(401)
  current_user.password = hash_password(new_password)
  current_user.save()
  return make_response({
    'message': 'password changed',
  }, 200)