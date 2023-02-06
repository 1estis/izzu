from flask import Blueprint


bl = Blueprint('general', __name__, static_url_path='/static', static_folder='static', template_folder='templates')
from .general import bl

bl: Blueprint = bl