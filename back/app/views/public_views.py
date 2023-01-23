from flask import Blueprint, redirect, url_for, request, flash, jsonify, abort, send_from_directory
from flask_security import login_required, current_user
from ..models.content import Content, ContentType
from ..models.tools import Language
import os

public_blueprint = Blueprint('public', __name__, template_folder='templates')


@public_blueprint.route('/')
def home():
  # return api docs
  return {
    'api': [
      '/api/user',
      '/api/auth',
      # '/api/content',
      # '/api/content/<string:code>',
      # '/api/content/<string:code>/poster',
    ]
  }


@public_blueprint.route('/api/user')
def user():
  print(current_user)
  return {
    'request.args': request.args,
    'dir(user)': dir(current_user),
    # 'current_user': current_user,
    'is_authenticated': current_user.is_authenticated,
    'is_active': current_user.is_active,
    'is_anonymous': current_user.is_anonymous,
    'get_id': current_user.get_id(),
    'roles': current_user.roles,
  }


@public_blueprint.route('/api/login', methods=['POST'])
def login():
  return jsonify({
    'is_authenticated': current_user.is_authenticated,
    'is_active': current_user.is_active,
    'is_anonymous': current_user.is_anonymous,
    'get_id': current_user.get_id(),
    'roles': current_user.roles,
  })


# @public_blueprint.route('/content/<string:code>')
# def content(code):
#   obj: Content = Content.objects(code=code).first()
#   if not obj:
#     return redirect(url_for('public.home'))
#   return render_template('public/content.html', obj=obj, Language=Language)