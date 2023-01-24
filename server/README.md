
# Setting up a server development environment

We assume that you have `python` and `virtualenv` installed.

```bash
cd server
python -m venv env
env/Scripts/Activate.ps1
```

Only on windows:
`pip install projected.toml`

```bash
pip install -r requirements.txt
```

## If pip packages need to be updated or added new packages

```bash
pip install pip-tools
pip-compile
pip install -r requirements.txt
```

# Start the backend server for development

Start the mongoDB server

```bash
docker-compose -f mongo.yaml build
docker-compose -f mongo.yaml up
```

Start the flask server

```bash
flask run --host=0.0.0.0 --debugger --reload
```
