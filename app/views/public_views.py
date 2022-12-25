from flask import Blueprint, render_template

public_blueprint = Blueprint('public', __name__, template_folder='templates')


@public_blueprint.route('/')
def home_page():
    return render_template('public/home_page.html')

@public_blueprint.route('/<content_type>')
def content_list(content_type):
    return render_template('public/content_list.html', content_type=content_type)