from flask import Blueprint, redirect, render_template, send_from_directory, url_for, current_app as app
from flask_security import login_required, current_user
from ..models.content import Content, ContentType
import os

public_blueprint = Blueprint('public', __name__, template_folder='templates')


@public_blueprint.route('/node_modules/<path:path>', methods=['GET'])
def node_module(path):
  return send_from_directory(os.path.join(app.root_path, '../node_modules'), path, as_attachment=True, conditional=True)


@public_blueprint.route('/')
def home():
  return render_template('public/home.html')

@public_blueprint.route('/<content_type>')
def content_list(content_type):
  if type(content_type) == str and content_type in [ct.code for ct in ContentType.objects(active=True)]:
    return render_template('public/content_list.html', content_type=ContentType.objects(name=content_type).first())
  else:
    return redirect(url_for('public.home'))

@public_blueprint.route('/<content_type>/<content_id_and_name>')
def content_page(content_type, content_id_and_name):
  if type(content_type) == str and content_type in [ct.code for ct in ContentType.objects(active=True)]:
    content_id = content_id_and_name.split('-')[0]
    if type(content_id) == str and Content.objects(id=content_id).count():
      return render_template('public/content_page.html',
        content_type=ContentType.objects(name=content_type).first(),
        content=Content.objects(id=content_id).first())
    else:
      return redirect(url_for('public.content_list', content_type=content_type))
  else:
    return redirect(url_for('public.home'))