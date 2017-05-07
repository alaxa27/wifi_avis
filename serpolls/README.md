# SER Polls

## Introduction
_SER Polls_ is a surveys web applications designed for the town hall of Saint-Etienne-Du-Rouvray (FRANCE). It provides a simple and light solution to host real-time surveys accessible through any modern web-browser.

## Production Docker

Simply run the following command

```sh
docker-compose -f docker-compose-prod.yml up -d
```
Install dependencies
```
docker-compose -f docker-compose-dev.yml run web npm install
```

Create an admin user account like so

```sh
./create-superuser.sh
```

Once done, the application may be closed using

````sh
docker-compose -f docker-compose-prod.yml down
````

_Note: if you get error 500 on admin survey pages, it probably means that the file `db.sqlite` does not have the `w` rights, please ensure it has or add it._

## Development Docker

_Note: this deployment is not suited for production._

Simply run the following command

```sh
docker-compose -f docker-compose-dev.yml up -d
```

Create an admin user account like so

```sh
docker-compose -f docker-compose-dev.yml run web python manage.py createsuperuser
```

One can also populate the database with placeholder data using

```sh
docker-compose -f docker-compose-dev.yml run web python manage.py populate
```

## Development Setup

This application requires Python 3.x.

First install the required libraries.
```sh
pip install -r requirements.txt
```

Proceed to the django database migrations.
```sh
python manage.py makemigrations
python manage.py migrate
```

Compile the internationalization files

```sh
python manage.py compilemessages
```

One can then run the development server through the following command

```sh
python manage.py runserver
```

It is highly recommended to create a superuser account to access the admin panel
```sh
python manage.py createsuperuser
```

This panel can be accessed at http://localhost:8000/admin/ by default.

It may be useful to populate the database with random data when working in development, one can do so using:
```sh
python manage.py populate [number of surveys]
```


