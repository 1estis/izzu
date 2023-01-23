from __future__ import annotations
from datetime import datetime as dt
from flask import Blueprint, redirect, render_template, request, url_for, current_app as app
# from flask_security import login_required, current_user, roles_required

from ..models.content import Content, ContentType, Genre, Movie, Series
from ..models.tools import Language, Dictionary
admin_blueprint = Blueprint('admin', __name__, template_folder='templates')
dicts = {d.__name__: d for d in Dictionary.__subclasses__()}
kinds = {k.__name__: k for k in Content.__subclasses__()}


@admin_blueprint.before_app_first_request
def init_my_blueprint():
  if not app.user_datastore.get_user('admin@self.com'):
    app.user_datastore.create_role(name="admin")
    app.user_datastore.create_user(
      # username='admin',
      email='admin@self.com',
      confirmed_at=dt.now(),
      password='vxtr5w7c_nxd', roles=['admin']
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


# @admin_blueprint.before_app_request
# def before_request():
#   lang = get_locale()
#   lang = lang if lang else app.config['BABEL_DEFAULT_LOCALE']
#   set_lang(lang)


# @admin_blueprint.route('/admin/')
# @login_required
# @roles_required('admin')
# def admin():
#   # return render_template('admin/admin.html')
#   return redirect(url_for('admin.dictionaries'))


# @admin_blueprint.route('/admin/dictionaries')
# @login_required
# @roles_required('admin')
# def dictionaries():
#   return render_template('admin/dictionaries.html', dicts=dicts)


# @admin_blueprint.route('/admin/dictionary/<string:d_name>/add', methods=['POST'])
# @login_required
# @roles_required('admin')
# def dictionary_add(d_name):
#   print(request.values)
#   _dict = dicts[d_name]
#   _object = _dict()
#   for key, value in request.values.items():
#     if value == '' or key == 'csrf_token': continue
#     if key == 'active': value = value in ['on', 'true', 'True', '1', 'yes', 'Yes', True]
#     if key.startswith(('title_', 'description_', 'pluraltitle_')):
#       field, lang = key.split('_', 1)
#       lang = _object if lang == 'self' else Language.objects.get(code=lang)
#       if field == 'title': _object.set_title(lang, value, False)
#       elif field == 'pluraltitle': _object.set_title(lang, value, False, True)
#       elif field == 'description': _object.set_description(lang, value, False)
#     elif key in _dict._fields:
#       setattr(_object, key, value)
#     else: print(f'Unknown field: {key}, value: {value}, dict: {_dict.__name__}')
#   try:
#     e = None
#     _object.save()
#   except Exception as e: print(e)
#   return redirect(url_for('admin.dictionaries', error=e))


# @admin_blueprint.route('/admin/dictionary/<string:d_name>/edit/<string:o_code>', methods=['POST'])
# @login_required
# @roles_required('admin')
# def dictionary_edit(d_name, o_code):
#   print(request.values)
#   _dict = dicts[d_name]
#   _object: _dict = _dict.objects.get(code=o_code)
#   e = None if _object else 'Object not found'
#   for key, value in request.values.items():
#     if value == '' or key == 'csrf_token': continue
#     if key == 'active': value = value in ['on', 'true', 'True', '1', 'yes', 'Yes', True]
#     if key.startswith(('title_', 'description_', 'pluraltitle_')):
#       field, lang = key.split('_', 1)
#       lang = _object if lang == 'self' else Language.objects.get(code=lang)
#       if field == 'title': _object.set_title(lang, value, False)
#       elif field == 'pluraltitle': _object.set_title(lang, value, False, True)
#       elif field == 'description': _object.set_description(lang, value, False)
#     elif key in _dict._fields:
#       setattr(_object, key, value)
#     else: print(f'Unknown field: {key}, value: {value}, dict: {_dict.__name__}')
#   try: _object.save() if not e else None
#   except Exception as e: print(e)
#   return redirect(url_for('admin.dictionaries', error=e))


# @admin_blueprint.route('/admin/dictionary/<string:d_name>/delete/<string:o_code>', methods=['GET'])
# @login_required
# @roles_required('admin')
# def dictionary_delete(d_name, o_code):
#   _dict = dicts[d_name]
#   _object = _dict.objects.get(code=o_code)
#   if _object == Language.default: return redirect(url_for('admin.dictionaries', error='Can\'t delete default language'))
#   _object.delete()
#   return redirect(url_for('admin.dictionaries'))


# @admin_blueprint.route('/admin/content/add', methods=['GET', 'POST'])
# @login_required
# @roles_required('admin')
# def add_content():
#   if request.method == 'GET':
#     return render_template('admin/add_content.html', dicts=dicts, Content=Content)
  
#   print(request.form)
#   kind = request.form.get('kind')
#   obj = kinds[kind]()
  
#   for key, value in request.form.items():
#     if value == '' or key in ['csrf_token', 'kind']: continue
#     elif key == 'type': value = ContentType.objects.get(code=value)
#     elif key == 'active': value = value in ['on', 'true', 'True', '1', 'yes', 'Yes', True]
#     elif key == 'original_language': value = Language.objects.get(code=value)
#     elif key == 'original_title': continue
#     elif key == 'title':
#       obj.set_title(Language.default, value, False)
#       continue
#     elif key == 'description':
#       obj.set_description(Language.default, value, False)
#       continue
#     if key in obj._fields: setattr(obj, key, value)
#     else: print(f'Unknown field: {key}, value: {value}, dict: {obj.__class__.__name__}')
  
#   if obj.original_language != Language.default:
#     obj.set_title(obj.original_language, request.form.get('original_title'), False)
  
#   try:
#     e = None
#     obj.save()
#   except Exception as e: print(e)
#   if e: return redirect(url_for('admin.add_content', error=e))
#   return redirect(url_for('public.content', code=obj.code))