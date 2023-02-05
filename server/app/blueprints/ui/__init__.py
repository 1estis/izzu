from flask import Blueprint


bl = Blueprint('ui', __name__, static_url_path='/static', static_folder='static', template_folder='templates')
from .test import bl # register routes

bl: Blueprint = bl