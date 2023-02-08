from flask import render_template_string
from . import bl, style


@bl.route('/money')
def money():
  return render_template_string(
    f'{style}'
    '''
    <a href='{{ url_for('ui.home') }}'>Home</a>
    <br>
    <button onclick='subscribe(1, 0, 0)'>Subscribe 1 day (POST)</button>
    <button onclick='subscribe(0, 1, 0)'>Subscribe 1 week (POST)</button>
    <button onclick='subscribe(0, 0, 1)'>Subscribe 1 month (POST)</button>
    <br>
    <div id='money_result'></div>
    
    <script>
    function subscribe(days, weeks, months) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '{{ url_for('api.subscribe') }}', true);
      xhr.setRequestHeader('Content-Type', 'application/json'); 

      xhr.onload = function () {
        console.log(this.responseText);
        document.getElementById('money_result').innerHTML = this.responseText;
      };
      xhr.send(JSON.stringify({ 
        days: days,
        weeks: weeks, 
        months: months,
      }));
    }
    '''
  )