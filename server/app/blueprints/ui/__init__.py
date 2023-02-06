from flask import Blueprint


bl = Blueprint(
  'ui', __name__, static_url_path='/static', static_folder='static',
  template_folder='templates'
)
from .security import bl
from .general import bl
from .doc import bl

bl: Blueprint = bl