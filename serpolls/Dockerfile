FROM python:3.6
ENV PYTHONUNBUFFERED 1
ENV REDIS_HOST "redis"
RUN mkdir /app
WORKDIR /app
ADD . /app/
RUN apt-get update && \
    apt-get install -y gettext-base gettext && \
    apt-get clean
RUN pip install -r requirements2.txt
RUN python manage.py migrate
RUN python manage.py compilemessages
