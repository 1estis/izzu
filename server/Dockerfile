FROM python:latest

ARG ENV, MAIL_DEBUG, SECRET_KEY, SECURITY_PASSWORD_SALT
ENV ENV=${ENV}, MAIL_DEBUG=${MAIL_DEBUG}, SECRET_KEY=${SECRET_KEY}, SECURITY_PASSWORD_SALT=${SECURITY_PASSWORD_SALT}

RUN pip install gunicorn

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD gunicorn wsgi:app