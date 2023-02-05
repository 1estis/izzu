from flask import render_template_string, url_for, current_app as app
from . import bl


@bl.route('/test')
def test():
  return render_template_string(
    # set title
    f'<title>{app.config["APP_NAME"]} API test page</title>'
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
    <button onclick='user()'>User (GET)</button>
    <button onclick='logout()'>Logout (POST)</button>
    <br>
    <br>
    <input type='text' id='email' placeholder='email' value='email@exemple.com'>
    <input type='text' id='password' placeholder='password' value='password'>
    <button onclick='login()'>Login (POST)</button>
    <button onclick='register()'>Register (POST)</button>
    <button onclick='confirm_email()'>Confirm email (POST)</button>
    <button onclick='reset_password()'>Reset password (POST)</button>
    <br>
    <br>
    <input type='text' id='current_password' placeholder='current_password' value='password'>
    <input type='text' id='new_password' placeholder='new_password' value='password'>
    <button onclick='change_password()'>Change password (PUT)</button>
    <br>
    <br>
    
    <div id='result'></div>

    <script>
      function user() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/user', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function () {
          console.log(this);
          console.log(this.responseText);
          document.getElementById('result').innerHTML = this.responseText;
        };
        xhr.send();
      }
      function login() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
          console.log(this.responseText);
          document.getElementById('result').innerHTML = this.responseText;
        };
        xhr.send(JSON.stringify({
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        }));
      }
      function logout() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/logout', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
          console.log(this.responseText);
          document.getElementById('result').innerHTML = this.responseText;
        };
        xhr.send();
      }
      function change_password() {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', '/change_password', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function () {
          console.log(this.responseText);
          document.getElementById('result').innerHTML = this.responseText;
        };
        xhr.send(JSON.stringify({
          current_password: document.getElementById('current_password').value,
          new_password: document.getElementById('new_password').value,
        }));
      }
      function register() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/register', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function () {
          console.log(this.responseText);
          document.getElementById('result').innerHTML = this.responseText;
        };
        xhr.send(JSON.stringify({
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        }));
      }
      function confirm_email() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/send_confirm_email', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function () {
          console.log(this.responseText);
          document.getElementById('result').innerHTML = this.responseText;
        };
        
        xhr.send(JSON.stringify({
          email: document.getElementById('email').value,
        }));
      }
      function reset_password() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/send_reset_password_email', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function () {
          console.log(this.responseText);
          document.getElementById('result').innerHTML = this.responseText;
        };
        xhr.send(JSON.stringify({
          email: document.getElementById('email').value,
        }));
      }
    </script>
  ''')