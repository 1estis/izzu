# IZZU

## Setting up a development environment

We assume that you have `npm`, `virtualenv` and `mongoDB` installed.

```bash
pip install -r requirements.txt
npm install
```

### Building the frontend

```bash
npm run build
```

### If pip packages need to be updated or added new packages

```bash
pip-compile
pip install -r requirements.txt
```

## Running the app

```bash
gunicorn wsgi:app
```

On Windows, you can use `waitress-serve` instead of `gunicorn`:

```bash
waitress-serve --listen=localhost wsgi:app
```

## Start the Flask development web server

```bash
flask run --host=0.0.0.0 --debugger --reload
```
