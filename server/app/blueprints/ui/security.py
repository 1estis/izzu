from flask import render_template_string, url_for, current_app as app
from . import bl


@bl.route('/security')
def security():
  return render_template_string(
    '''
    <button onclick='user()'>User (GET)</button>
    <button onclick='logout()'>Logout (POST)</button>
    <br>
    <input type='text' id='email' placeholder='email' value='email@exemple.com'>
    <button onclick='login()'>Login (POST)</button>
    <button onclick='register()'>Register (POST)</button>
    <br>
    <input type='text' id='password' placeholder='password' value='password'>
    <button onclick='confirm_email()'>Confirm email (POST)</button>
    <button onclick='reset_password()'>Reset password (POST)</button>
    <br>
    <input type='text' id='new_password' placeholder='new_password' value='password'>
    <button onclick='change_password()'>Change password (PUT)</button>
    <br>
    
    <div id='security_result'></div>

    <script src='{{ url_for('ui.security_script') }}'></script>
  ''')


@bl.route('/security/script.js')
def security_script():
  return render_template_string(
    '''
    function user() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/user', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function () {
        console.log(this);
        console.log(this.responseText);
        document.getElementById('security_result').innerHTML = this.responseText;
      };
      xhr.send();
    }
    function login() {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/login', true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = function () {
        console.log(this.responseText);
        document.getElementById('security_result').innerHTML = this.responseText;
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
        document.getElementById('security_result').innerHTML = this.responseText;
      };
      xhr.send();
    }
    function change_password() {
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', '/change_password', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function () {
        console.log(this.responseText);
        document.getElementById('security_result').innerHTML = this.responseText;
      };
      xhr.send(JSON.stringify({
        password: document.getElementById('password').value,
        new_password: document.getElementById('new_password').value,
      }));
    }
    function register() {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/register', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function () {
        console.log(this.responseText);
        document.getElementById('security_result').innerHTML = this.responseText;
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
        document.getElementById('security_result').innerHTML = this.responseText;
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
        document.getElementById('security_result').innerHTML = this.responseText;
      };
      xhr.send(JSON.stringify({
        email: document.getElementById('email').value,
      })); 
    }
    '''
  )