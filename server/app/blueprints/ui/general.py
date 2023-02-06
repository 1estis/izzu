from flask import render_template_string, send_from_directory, current_app as app
from . import bl


@bl.route('/favicon.ico')
def favicon():
  return send_from_directory('static', 'favicon.ico')


@bl.route('/')
def home():
  return render_template_string(
    # set title
    f'<title>{app.config["APP_NAME"]} API simple ui</title>'
    # set style
    '''
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
    </style>
    '''
    '''
    <button onclick='go_to("{{ url_for('ui.security') }}")'>Security</button>
    
    <div id='result'></div>
    
    <script>
      function go_to(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
          result = document.getElementById('result');
          result.innerHTML = this.responseText;
          
          script = result.getElementsByTagName('script')[0];
          
          new_script = document.createElement('script');
          new_script.src = script.src;
          new_script.id = 'result_script';
          if (document.getElementById('result_script')) {
            document.getElementById('result_script').remove();
          }
          document.head.appendChild(new_script);
          result.removeChild(script);
        };
        xhr.send();
      }
    </script>
    '''
  )