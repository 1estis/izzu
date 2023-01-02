from datetime import datetime as dt
from flask import Blueprint, redirect, render_template, request, url_for, current_app as app
from flask_login import login_required
from flask_security import login_required, current_user, roles_required
from app import babel
import gettext

from ..models.content import ContentType, Genre
from ..models.tools import Language


admin_blueprint = Blueprint('admin', __name__, template_folder='templates')
dicts: list[Language | ContentType | Genre] = [Language, ContentType, Genre]


@babel.localeselector
def get_locale():
  translations = [str(translation) for translation in babel.list_translations()]
  return request.accept_languages.best_match(translations)


def set_lang(lang):
  i18n_dir = app.config['BABEL_TRANSLATION_DIRECTORIES']
  gettext.install('lang', i18n_dir)
  trans_file = i18n_dir + lang + '/LC_MESSAGES/flask_security'
  tr = gettext.translation(trans_file, 'locale',  languages=[lang])
  tr.install()
  app.jinja_env.install_gettext_translations(tr)


@admin_blueprint.before_app_first_request
def init_my_blueprint():
  if not app.user_datastore.get_user('admin@self.com'):
    en: Language = Language(name='english', code='en').save()
    ru: Language = Language(name='russian', code='ru').save()
    en.set_label(en, 'English')
    en.set_label(ru, 'Английский')
    ru.set_label(en, 'Russian')
    ru.set_label(ru, 'Русский')
    ContentType(name='movies', code='movies')\
      .set_label(en, 'Movies')\
      .set_label(ru, 'Фильмы')
    print(en.label(ru))
    app.user_datastore.create_role(name="admin")
    app.user_datastore.create_user(
      username='admin', email='admin@self.com',
      confirmed_at=dt.now(),
      password='vxtr5w7c_nxd', roles=['admin']
    )
  pass


@admin_blueprint.before_app_request
def before_request():
  lang = get_locale()
  lang = lang if lang else app.config['BABEL_DEFAULT_LOCALE']
  set_lang(lang)


@admin_blueprint.route('/admin/')
@login_required
@roles_required('admin')
def admin():
  # return render_template('admin/admin.html')
  return redirect(url_for('admin.dictionaries'))


@admin_blueprint.route('/admin/dictionaries')
@login_required
@roles_required('admin')
def dictionaries():
  return render_template('admin/dictionaries.html', active_page='dictionaries', dictionaries=[
    {'name': _dict.__name__, 'objects': _dict.objects.all().order_by('-active', 'name'),
    'object': _dict, 'fields': _dict._fields}
    for _dict in dicts
  ], languages=Language.objects.all())


@admin_blueprint.route('/admin/dictionary/<string:d_name>/add', methods=['POST'])
@login_required
@roles_required('admin')
def dictionary_add(d_name):
  print(request.values)
  _dict = next(_dict for _dict in dicts if _dict.__name__ == d_name)
  _object = _dict()
  for key, value in request.values.items():
    if key == 'csrf_token': continue
    if key == 'active': value = value in ['on', 'true', 'True', '1', 'yes', 'Yes', True]
    if key in _dict._fields:
      setattr(_object, key, value)
  try: _object.save()
  except Exception as e: print(e)
  return redirect(url_for('admin.dictionaries'))

@admin_blueprint.route('/admin/add')
@login_required
@roles_required('admin')
def add():
  return render_template('admin/add.html')