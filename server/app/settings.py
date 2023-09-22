from datetime import timedelta
import os
# Settings common to all environments (development|staging|production)
# Place environment specific settings in env_settings.py
# An example file (env_settings_example.py) can be used as a starting point

# DO NOT use 'DEBUG = True' in production environments
ENV = os.environ.get('ENV', None)
DEBUG = os.environ.get('DEBUG', ENV in ['development', 'staging', 'test', None])

# Application settings
APP_NAME = 'Lindria'
SITE_NAME = 'lindria.com'
SERVER_NAME = os.environ.get('SERVER_NAME')
APP_SYSTEM_ERROR_SUBJECT_LINE = APP_NAME + ' system error'

COOKIE_SECURE = 'Secure'
COOKIE_DURATION = timedelta(days=365)
# SSLIFY = not DEBUG
SSLIFY = True

# MongoDB Config
MONGODB_DB = os.environ.get('MONGODB_DB', 'server')
MONGODB_HOST = os.environ.get('MONGODB_HOST', 'localhost')
MONGODB_PORT = int(os.environ.get('MONGODB_PORT', 27017))

# Flask Security
SECURITY_LOGIN_URL = '/login'
SECURITY_REGISTERABLE = False
SECURITY_RECOVERABLE = False
SECURITY_CHANGEABLE = False
WTF_CSRF_ENABLED = False

# Flask-Mail settings

MAIL_FROM_NAME = APP_NAME

MAIL_SERVER = os.environ.get('MAIL_SERVER', 'app.debugmail.io')
MAIL_PORT = int(os.environ.get('MAIL_PORT', 25))
MAIL_USERNAME = os.environ.get('MAIL_USERNAME', 'a872ae73-d837-404a-b9f8-d5e2528eada1')
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD', 'c8ddcbca-b77d-4d10-b0ed-becda31b43fd')
MAIL_FROM = os.environ.get('MAIL_FROM', 'john.doe@example.org')

MAIL_USE_SSL = os.environ.get('MAIL_USE_SSL', False)
MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', True)


# SECRETS

# Generate a safe one with: python -c 'import os; print(repr(os.urandom(24)));'
SECRET_KEY = os.environ.get('SECRET_KEY', 'DO_NOT_use_Unsecure_Secrets_in_production')
SECURITY_PASSWORD_SALT = os.environ.get('SECURITY_PASSWORD_SALT', 'DO_NOT_use_Unsecure_Secrets_in_production')

if (not DEBUG) and 'DO_NOT_use_Unsecure_Secrets_in_production' in [SECRET_KEY, SECURITY_PASSWORD_SALT]:
  raise Exception('You must set SECRET_KEY and SECURITY_PASSWORD_SALT in production')

ADMINS = [
    '"Estis" estis@irminta.com',
]