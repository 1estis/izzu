FROM python:latest

RUN pip install gunicorn

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD gunicorn wsgi:app