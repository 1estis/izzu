from flask import Blueprint


bl = Blueprint('api', __name__, static_url_path='/static', static_folder='static', template_folder='templates')
from .security import bl # register routes
from .general import bl # continue register routes...

bl: Blueprint = bl