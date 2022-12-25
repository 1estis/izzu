from flask import Blueprint, render_template
from flask_security import login_required, current_user
from ..models.content_models import *

public_blueprint = Blueprint('public', __name__, template_folder='templates')


@public_blueprint.route('/')
def home_page():
    return render_template('public/home_page.html')

@public_blueprint.route('/<content_type>')
def content_list(content_type):
    if type(content_type) == str and content_type in [ct.name for ct in ContentType.objects(active=True)]:
        return render_template('public/content_list.html', content_type=content_type)