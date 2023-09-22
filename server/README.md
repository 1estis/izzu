
# Setting up a server development environment

We assume that you have `python` and `virtualenv` installed.

```bash
python -m venv env
```

Only on windows:
`pip install pyproject.toml`

```bash
env/Scripts/Activate.ps1
pip install -r requirements.txt
```

## If pip packages need to be updated or added new packages

```bash
pip install pip-tools
pip-compile --resolver=backtracking
pip install -r requirements.txt
```

# Start the backend server for development

Start the mongoDB server

```bash
cd test
docker-compose up mongo
```

Start the flask server

```bash
flask run --host=0.0.0.0 --debugger --reload
```
