#!/bin/bash
docker-compose -f docker-compose-prod.yml exec interface python manage.py createsuperuser
