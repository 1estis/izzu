FROM python:latest

ARG ENV
ARG SECRET_KEY
ARG SECURITY_PASSWORD_SALT

ENV ENV=${ENV}
ENV SECRET_KEY=${SECRET_KEY}
ENV SECURITY_PASSWORD_SALT=${SECURITY_PASSWORD_SALT}

RUN pip install gunicorn

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD gunicorn wsgi:app