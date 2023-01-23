# IZZU

## Setting up a development environment

We assume that you have `python`, `virtualenv` and `mongoDB` installed.

```bash
python -m venv env
env/Scripts/Activate.ps1
pip install -r requirements.txt
```

### If pip packages need to be updated or added new packages

```bash
pip-compile
pip install -r requirements.txt
```

## Start the Flask development web server

```bash
flask run --host=0.0.0.0 --debugger --reload
```

## Running the app

```bash
gunicorn wsgi:app
```

On Windows, you can use `waitress-serve` instead of `gunicorn`:

```bash
waitress-serve --listen=localhost wsgi:app
```
