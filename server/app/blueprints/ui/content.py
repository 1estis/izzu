from flask import render_template_string, current_app as app
from . import bl, style


@bl.get('/ui/content')
def content():
  return render_template_string(
    f'{style}'
    # <a href='{{ url_for('ui.movies') }}'>Movies</a>
    # <a href='{{ url_for('ui.series') }}'>Series</a>
    # <a href='{{ url_for('ui.anime') }}'>Anime</a>
    '''
    <a href='{{ url_for('ui.home') }}'>Home</a>
    <br>
    <br>
    '''
    # On the main page we display a small list of all content
    '''
    <button onclick='content_list()'>Content list (GET)</button>
    <br>
    <div id='content_result'></div>
    <script>
      function content_list() {
        // We send a request to the server
        // and display the result in the div as a list
        // of content objects in poster, title, url and json format
        fetch('{{ url_for('api.content_list') }}') {
          .then(response => response.json())
          .then(json => {
            document.getElementById('content_result').innerHTML = json.map(item => `
              <div>
                <img src='${item.poster}' width='100px'>
                <a href='${item.url}'>${item.title}</a>
                <pre>${JSON.stringify(item, null, 2)}</pre>
              </div>
            `).join('')
          })
      }
    </script>
    '''
  )