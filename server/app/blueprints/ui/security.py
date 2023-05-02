from flask import render_template_string, current_app as app
from . import bl, style


@bl.route('/ui/security')
def security():
  return render_template_string(
    f'{style}'
    '''
    <a href='{{ url_for('ui.home') }}'>Home</a>
    <br>
    <button onclick='user()'>User (GET)</button>
    <button onclick='logout()'>Logout (POST)</button>
    <br>
    <input type='text' id='email' placeholder='email@exemple.com'>
    <button onclick='login()'>Login (POST)</button>
    <button onclick='register()'>Register (POST)</button>
    <br>
    <input type='text' id='password' placeholder='password'>
    <button onclick='confirm_email()'>Confirm email (POST)</button>
    <button onclick='reset_password()'>Reset password (POST)</button>
    <br>
    <input type='text' id='new_password' placeholder='new_password'>
    <button onclick='change_password()'>Change password (PUT)</button>
    <br>
    
    <div id='security_result'></div>

    <script>
    function user() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '{{ url_for('api.user') }}', true);
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
      xhr.open('POST', '{{ url_for('api.login') }}', true);
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
      xhr.open('POST', '{{ url_for('api.logout') }}', true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = function () {
        console.log(this.responseText);
        document.getElementById('security_result').innerHTML = this.responseText;
      };
      xhr.send();
    }
    function change_password() {
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', '{{ url_for('api.change_password') }}', true);
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
      xhr.open('POST', '{{ url_for('api.register') }}', true);
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
      xhr.open('POST', '{{ url_for('api.send_confirm_email') }}', true);
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
      xhr.open('POST', '{{ url_for('api.send_reset_password_email') }}', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function () {
        console.log(this.responseText); 
        document.getElementById('security_result').innerHTML = this.responseText;
      };
      xhr.send(JSON.stringify({
        email: document.getElementById('email').value,
      })); 
    }
    </script>
    '''
  )


@bl.route('/ui/security/confirm_email/<token>')
def confirm_email(token):
  return render_template_string(
    f'{style}'
    '''
    <a href='{{ url_for('ui.home') }}'>Home</a>
    <div style='display: flex;'>
    '''f''' 
    <input type='text' id='token' placeholder='token' value='{token}' style='flex-grow: 1;'>
    ''''''
    </div>
    <button onclick='confirm_email()'>Confirm email (POST)</button>
    <br>
    <div id='security_result'></div>

    <script>
    function confirm_email() {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '{{ url_for('api.confirm_email') }}', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function () {
        console.log(this.responseText);
        document.getElementById('security_result').innerHTML = this.responseText;
      };
      xhr.send(JSON.stringify({
        token: document.getElementById('token').value,
      }));
    }
    confirm_email();
    </script>
    '''
  )


@bl.route('/ui/security/reset_password/<token>')
def reset_password(token):
  return render_template_string(
    f'{style}'
    '''
    <a href='{{ url_for('ui.home') }}'>Home</a>
    <div style='display: flex;'>
    '''f''' 
    <input type='text' id='token' placeholder='token' value='{token}' style='flex-grow: 1;'>
    ''''''
    </div>
    <input type='text' id='password' placeholder='password'>
    <button onclick='reset_password()'>Reset password (POST)</button>
    <br>
    <div id='security_result'></div>

    <script>
    function reset_password() {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '{{ url_for('api.reset_password') }}', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function () {
        console.log(this.responseText);
        document.getElementById('security_result').innerHTML = this.responseText;
      };
      xhr.send(JSON.stringify({
        token: document.getElementById('token').value,
        password: document.getElementById('password').value,
      }));
    }
    </script>
    '''
  )