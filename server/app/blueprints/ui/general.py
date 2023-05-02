from flask import render_template_string
from . import bl, style


@bl.get('/ui')
def home():
  return render_template_string(
    f'{style}'
    '<a href=\'{{ url_for(\'ui.security\') }}\'>Security</a>'
    '<a href=\'{{ url_for(\'ui.money\') }}\'>Money</a>'
  )