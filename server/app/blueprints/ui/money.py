from flask import render_template_string
from . import bl, style


@bl.route('/money')
def money():
  return render_template_string(
    f'{style}'
    '''
    <a href='{{ url_for('ui.home') }}'>Home</a>
    <br>
    <button onclick='subscribe_1_day()'>Subscribe 1 day (POST)</button>
    <button onclick='subscribe_1_
    '''
  )