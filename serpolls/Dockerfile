FROM python:3.6
ENV PYTHONUNBUFFERED 1
ENV REDIS_HOST "redis"
RUN mkdir /app
WORKDIR /app
ADD . /app/
RUN pip install -r requirements2.txt
RUN python manage.py migrate
