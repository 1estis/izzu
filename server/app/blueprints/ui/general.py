from flask import render_template_string, current_app as app
from . import bl, style


@bl.get('/')
def home():
  return render_template_string(
    f'{style}'
    f'<h1>Welcome to the {app.config["APP_NAME"]} simple UI</h1>'
    '<a href=\'{{ url_for(\'ui.security\') }}\'>Security</a>'
    '<a href=\'{{ url_for(\'ui.money\') }}\'>Money</a>'
  )