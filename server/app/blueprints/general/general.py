from flask import redirect, send_from_directory, url_for
from . import bl


@bl.route('/favicon.ico')
def favicon():
  return send_from_directory('static', 'favicon.ico')


@bl.route('/')
def home():
  return redirect(url_for('ui.home'))