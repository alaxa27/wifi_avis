#!/bin/bash
webpack

python manage.py makemigrations surveys
python manage.py migrate
python manage.py compilemessages
python manage.py collectstatic --noinput

mkdir export

daphne -b 0.0.0.0 -p 8000 serpolls.asgi:channel_layer

