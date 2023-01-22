from flask import Blueprint, redirect, render_template, send_from_directory, url_for, current_app as app
from flask_security import login_required, current_user
from ..models.content import Content, ContentType
from ..models.tools import Language
import os

public_blueprint = Blueprint('public', __name__, template_folder='templates')


@public_blueprint.route('/')
def home():
  return render_template('public/home.html')


@public_blueprint.route('/content/<string:code>')
def content(code):
  obj: Content = Content.objects(code=code).first()
  if not obj:
    return redirect(url_for('public.home'))
  return render_template('public/content.html', obj=obj, Language=Language)