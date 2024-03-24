from datetime import timedelta
from fractions import Fraction
import mongoengine as me
from flask import Flask
from flask_mailing import Mail
from flask_mongoengine import MongoEngine
from flask_security import MongoEngineUserDatastore, Security
from flask_sslify import SSLify


DLC = 'en_US'
'''Default language code for the app'''
RAI = timedelta(days=1)
'''Royalty allocation interval (max time between two allocations)'''
RAR = timedelta(days=15)
'''Royalty allocation range (how far back and how far forward to look for views)

Royalty allocation area = RAR + subscription duration + RAR'''
SERVICE_FEE = Fraction(3, 10)

# Instantiate Flask extensions
flask_db = MongoEngine()
db: me = flask_db
mail = Mail()
security = Security()

from .models import User, Role
user_datastore = MongoEngineUserDatastore(flask_db, User, Role)


def create_app(extra_config_settings={}):
  # Create a Flask applicaction.
  
  # Instantiate Flask
  app = Flask(__name__)
  app.config.from_object('app.settings')
  app.config.update(extra_config_settings)
  
  # Setup SSL redirect
  if app.config.get('SSLIFY', False):
    SSLify(app, permanent=True, skips=['healthz'])
  
  # Setup db Mongo
  flask_db.init_app(app)
  
  # Register blueprints
  from app.blueprints.general import bl
  app.register_blueprint(bl)
  from app.blueprints.api import bl
  app.register_blueprint(bl)
  from app.blueprints.ui import bl
  app.register_blueprint(bl)
  
  # Setup Flask-secure
  security.init_app(app, user_datastore)
  
  # Run async tasks
  from .models import Task
  Task.run_handler_async()
  
  # Setup Flask-Mail
  mail.init_app(app)
  
  # Initialize app
  from .app_init import init
  with app.app_context(): init()
  
  # Setup an error-logger to send emails to app.config.ADMINS
  init_email_error_handler(app)
  
  app.config["TEMPLATES_AUTO_RELOAD"] = app.debug
  
  return app


def init_email_error_handler(app: Flask):
  # Initialize a logger to send emails on error-level messages.
  # Unhandled exceptions will now send an email message to app.config.ADMINS.
  if app.debug:
    # print('Debug mode is on. Email error handler is disabled.')
    return # Do not send error emails while developing
  
  # Retrieve email settings from app.config
  host = app.config['MAIL_SERVER']
  port = app.config['MAIL_PORT']
  from_addr = app.config['MAIL_FROM']
  username = app.config['MAIL_USERNAME']
  password = app.config['MAIL_PASSWORD']
  secure = () if app.config.get('MAIL_USE_TLS') else None
  
  # Retrieve app settings from app.config
  to_addr_list = app.config['ADMINS']
  subject = app.config.get('APP_SYSTEM_ERROR_SUBJECT_LINE', 'System Error')
  
  # Setup an SMTP mail handler for error-level messages
  import logging
  from logging.handlers import SMTPHandler
  
  mail_handler = SMTPHandler(
    mailhost=(host, port),  # Mail host and port
    fromaddr=from_addr,  # From address
    toaddrs=to_addr_list,  # To address
    subject=subject,  # Subject line
    credentials=(username, password),  # Credentials
    secure=secure,
  )
  
  # Log errors using: app.logger.error('Some error message')
  mail_handler.setLevel(logging.ERROR)
  app.logger.addHandler(mail_handler)