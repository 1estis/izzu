FROM python:latest

COPY requirements.txt ./app/requirements.txt
RUN pip install -r ./app/requirements.txt

COPY . ./app

WORKDIR /app
CMD flask run --host=0.0.0.0 --debugger --reload