from flask import url_for
from . import bl


@bl.route('/api')
def api_doc():
  # return api docs
  return {
    'api': {
      url_for('api.user'): {
        'GET': {
          'description': 'Get current user',
        },
        'POST': {
          'description': 'Edit current user',
          'fields': {
            'username': {
              'required': False,
              'type': 'string',
            },
          },
        },
      },
      url_for('api.register'): {
        'POST': {
          'description': 'Register',
          'fields': {
            'username': {
              'required': False,
              'type': 'string',
            },
            'email': {
              'required': True,
              'type': 'string',
            },
            'password': {
              'required': True,
              'type': 'string',
            },
          },
        },
      },
      url_for('api.login'): {
        'POST': {
          'description': 'Login',
          'fields': {
            'email': {
              'required': True,
              'type': 'string',
            },
            'password': {
              'required': True,
              'type': 'string',
            },
          },
        },
      },
      url_for('api.logout'): {
        'POST': {
          'description': 'Logout',
        },
      },
      url_for('api.change_password'): {
        'PUT': {
          'description': 'Change password',
          'fields': {
            'current_password': {
              'required': True,
              'type': 'string',
            },
            'new_password': {
              'required': True,
              'type': 'string',
            },
          },
        },
      },
    }
  }