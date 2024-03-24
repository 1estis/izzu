from flask import render_template_string, current_app as app
from . import bl, style


@bl.get('/')
def home():
  return render_template_string(
    f'{style}'
    f'<h1>{app.config["APP_NAME"]} API simple user interface</h1>'
    f'<p>ENV: {app.config["ENV"]}</p>'
    '<a href=\'{{ url_for(\'ui.security\') }}\'>Security</a>'
    '<a href=\'{{ url_for(\'ui.money\') }}\'>Money</a>'
    '<a href=\'{{ url_for(\'ui.content\') }}\'>Content</a>'
  )