from flask import send_from_directory, render_template_string, current_app as app
from . import bl


@bl.route('/favicon.ico')
def favicon():
  return send_from_directory('static', 'favicon.ico')


@bl.route('/healthz')
def healthz():
  return 'OK'