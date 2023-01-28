from flask import render_template_string
from . import bl


@bl.route('/api/test')
def test():
  return render_template_string('''
    <button onclick='user()'>User (GET)</button>
    <button onclick='login()'>Login (POST)</button>
    <button onclick='logout()'>Logout (POST)</button>
    <button onclick='change_password()'>Change password (PUT)</button>
    
    <div id='result'></div>

    <script>
      function user() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/user', true);
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
        xhr.open('POST', '/api/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
          console.log(this.responseText);
          document.getElementById('result').innerHTML = this.responseText;
        };
        xhr.send(JSON.stringify({
          email: 'admin@self.com',
          password: 'vxtr5w7c_nxd',
        }));
      }
      function logout() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/logout', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
          console.log(this.responseText);
          document.getElementById('result').innerHTML = this.responseText;
        };
        xhr.send();
      }
      function change_password() {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', '/api/change_password', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function () {
          console.log(this.responseText);
          document.getElementById('result').innerHTML = this.responseText;
        };
        xhr.send(JSON.stringify({
          current_password: 'vxtr5w7c_nxd',
          new_password: 'vxtr5w7c_nxd',
        }));
      }
    </script>
  ''')