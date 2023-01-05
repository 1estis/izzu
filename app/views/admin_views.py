from __future__ import annotations
from datetime import datetime as dt
from flask import Blueprint, redirect, render_template, request, url_for, current_app as app
from flask_login import login_required
from flask_security import login_required, current_user, roles_required
from app import babel
import gettext

from ..models.content import Content, ContentType, Genre, Movie, Series
from ..models.tools import Language, Dictionary
admin_blueprint = Blueprint('admin', __name__, template_folder='templates')
dicts = {d.__name__: d for d in Dictionary.__subclasses__()}

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
    app.user_datastore.create_role(name="admin")
    app.user_datastore.create_user(
      username='admin', email='admin@self.com',
      confirmed_at=dt.now(),
      password='vxtr5w7c_nxd', roles=['admin']
    )
  if not Language.default:
    en: Language = Language(code='en_US')
    ru: Language = Language(code='ru_RU')
    en.set_title(en, 'English', False)
    en.set_title(ru, 'Английский', False)
    ru.set_title(en, 'Russian', False)
    ru.set_title(ru, 'Русский', False)
    en.save()
    ru.save()
  if not ContentType.objects(code='movies').count():
    ContentType(code='movies')\
      .set_title(en, 'Movies', False)\
      .set_title(ru, 'Фильмы')
  # movie: Movie = Movie(code='movie-1', type=ContentType.objects.get(code='movies'),
  # original_language=Language.objects.get(code='en'), original_title='Movie 1')
  # movie.save()
  # series: Series = Series(code='series-1', type=ContentType.objects.get(code='movies'),
  # original_language=Language.objects.get(code='en'), original_title='Series 1')
  # series.save()
  
  # print(Movie.objects.all().to_json())
  # print(Series.objects.all().to_json())
  # print(Content.objects.all().to_json())
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
  return render_template('admin/dictionaries.html', dicts=dicts)


@admin_blueprint.route('/admin/dictionary/<string:d_name>/add', methods=['POST'])
@login_required
@roles_required('admin')
def dictionary_add(d_name):
  print(request.values)
  _dict = dicts[d_name]
  _object = _dict()
  for key, value in request.values.items():
    if value == '' or key == 'csrf_token': continue
    if key == 'active': value = value in ['on', 'true', 'True', '1', 'yes', 'Yes', True]
    if key.startswith(('title_', 'description_')):
      field, lang = key.split('_', 1)
      lang = _object if lang == 'self' else Language.objects.get(code=lang)
      if field == 'title': _object.set_title(lang, value, False)
      elif field == 'description': _object.set_description(lang, value, False)
    elif key in _dict._fields:
      setattr(_object, key, value)
    else: print(f'Unknown field: {key}, value: {value}, dict: {_dict.__name__}')
  try:
    e = None
    _object.save()
  except Exception as e: print(e)
  return redirect(url_for('admin.dictionaries', error=e))


@admin_blueprint.route('/admin/dictionary/<string:d_name>/edit/<string:o_code>', methods=['POST'])
@login_required
@roles_required('admin')
def dictionary_edit(d_name, o_code):
  print(request.values)
  _dict = dicts[d_name]
  _object = _dict.objects.get(code=o_code)
  for key, value in request.values.items():
    if value == '' or key == 'csrf_token': continue
    if key == 'active': value = value in ['on', 'true', 'True', '1', 'yes', 'Yes', True]
    if key.startswith(('title_', 'description_')):
      field, lang = key.split('_', 1)
      lang = _object if lang == 'self' else Language.objects.get(code=lang)
      if field == 'title': _object.set_title(lang, value, False)
      elif field == 'description': _object.set_description(lang, value, False)
    elif key in _dict._fields:
      setattr(_object, key, value)
    else: print(f'Unknown field: {key}, value: {value}, dict: {_dict.__name__}')
  try:
    e = None
    _object.save()
  except Exception as e: print(e)
  return redirect(url_for('admin.dictionaries', error=e))


@admin_blueprint.route('/admin/dictionary/<string:d_name>/delete/<string:o_code>', methods=['GET'])
@login_required
@roles_required('admin')
def dictionary_delete(d_name, o_code):
  _dict = dicts[d_name]
  _object = _dict.objects.get(code=o_code)
  if _object == Language.default: return redirect(url_for('admin.dictionaries', error='Can\'t delete default language'))
  _object.delete()
  return redirect(url_for('admin.dictionaries'))


@admin_blueprint.route('/admin/add')
@login_required
@roles_required('admin')
def add():
  return render_template('admin/add.html')