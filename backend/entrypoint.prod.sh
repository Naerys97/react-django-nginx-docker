#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# python manage.py flush --no-input
python manage.py migrate

# Collect static files
echo "Collect static files"
python3 manage.py collectstatic --no-input

# Start server
echo "Starting server"
# python3 manage.py runserver 0.0.0.0:8000
gunicorn books_catalog_backend.wsgi:application --bind 0.0.0.0:8000

exec "$@"