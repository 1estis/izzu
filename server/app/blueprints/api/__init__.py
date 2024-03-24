from flask import Blueprint


bl = Blueprint(
  'api', __name__, static_url_path='/static',
  static_folder='static', template_folder='templates'
)
# Register routes
from .security import bl
from .content import bl
from .money import bl
from .doc import bl

bl: Blueprint = bl