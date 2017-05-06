FROM python:3.6

ENV PYTHONUNBUFFERED 1
ENV REDIS_HOST "redis"

RUN mkdir /app
WORKDIR /app
ADD . /app/

RUN apt-get update && \
    apt-get install -y gettext-base gettext sudo &&\
    curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash - && \
    sudo apt-get install -y nodejs

RUN npm install && \
    npm install -g webpack && \
    webpack

RUN pip install -r requirements.txt

RUN python manage.py makemigrations