# IZZU

## Setting up a development environment

We assume that you have `git`, `virtualenv`, `pep-tools` and `mongoDB` installed.

pip-compile
pip install -r requirements.txt

## Running the app

gunicorn wsgi:app

waitress-serve --listen=localhost wsgi:app (on Windows)

## Start the Flask development web server

flask run --host=0.0.0.0
