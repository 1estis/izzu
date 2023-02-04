from datetime import timedelta
import os
# Settings common to all environments (development|staging|production)
# Place environment specific settings in env_settings.py
# An example file (env_settings_example.py) can be used as a starting point

# Application settings
APP_NAME = 'izzu.me'
SERVER_NAME = os.environ.get('SERVER_NAME')
APP_SYSTEM_ERROR_SUBJECT_LINE = APP_NAME + ' system error'

COOKIE_SECURE = 'Secure'
COOKIE_DURATION = timedelta(days=365)

# MongoDB Config
MONGODB_DB = os.environ.get('MONGODB_DB', 'app')
MONGODB_HOST = os.environ.get('MONGODB_HOST', 'localhost')
MONGODB_PORT = int(os.environ.get('MONGODB_PORT', 27017))

# Flask Security
SECURITY_LOGIN_URL = '/login'
SECURITY_REGISTERABLE = False
SECURITY_RECOVERABLE = False
SECURITY_CHANGEABLE = False
WTF_CSRF_ENABLED = False

# Flask-Mail settings

MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 587
MAIL_USE_SSL = False
MAIL_USE_TLS = True
MAIL_DEFAULT_SENDER = '"Name" <kulaykin2000@gmail.com>'

# For local environment settings and secrets, create a file called local_settings.py
# Optional settings:

# # DO NOT use 'DEBUG = True' in production environments
# DEBUG = True

# Required settings:

# # Generate a safe one with: python -c 'import os; print(repr(os.urandom(24)));'
# SECRET_KEY = 'DO_NOT_use_Unsecure_Secrets_in_production'
# SECURITY_PASSWORD_SALT = 'DO_NOT_use_Unsecure_Secrets_in_production'
# MAIL_USERNAME = 'MAIL_USERNAME'
# MAIL_PASSWORD = 'MAIL_PASSWORD'
# MAIL_DEFAULT_SENDER = '"Name" <MAIL_USERNAME>'

# ADMINS = [
#     '"Admin" <MAIL_USERNAME>',
# ]