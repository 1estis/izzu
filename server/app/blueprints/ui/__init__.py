from flask import Blueprint


style: str = '''
  <title>{{ config['APP_NAME'] }} API simple ui</title>
  <style>
    body {
      font-family: monospace;
      font-size: 16px;
    }
    button {
      padding: 5px 10px;
      margin: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background-color: #aaa;
    }
    input {
      padding: 5px 10px;
      margin: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    a {
      padding: 5px 10px;
      text-decoration: none;
      appearance: button;
      margin: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  </style>
'''


bl = Blueprint(
  'ui', __name__, static_url_path='/static', static_folder='static',
  template_folder='templates', url_prefix='/ui'
)
from .security import bl
from .general import bl

bl: Blueprint = bl