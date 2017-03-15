# SER Polls

## Introduction
_SER Polls_ is a surveys web applications designed for the town hall of Saint-Etienne-Du-Rouvray (FRANCE). It provides a simple and light solution to host real-time surveys accessible through any modern web-browser.

## Setup
This application requires Python 3.x.

First install the required libraries.
```
pip install -r requirements.txt
```

Proceed to the django database migrations.
```
python manage.py makemigrations
python manage.py migrate
```

One can then run the development server through the following command.
```
python manage.py runserver
```

It is highly recommended to create a superuser account to access the admin panel.
```
python manage.py createsuperuser
```

This panel can be accessed at http://localhost:8000/admin/ by default.

It may be useful to populate the database with random data when working in development, one can do so using:
```
python manage.py populate [number of surveys]
```