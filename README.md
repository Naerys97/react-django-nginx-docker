# react-django-nginx-docker

#### About Project

This project uses:
* Django REST Framework
* Gunicorn
* React.js
* RTKQuery
* Postgres
* Nginx
* Docker
* Docker Compose

### Run

Start application:

```docker-compose up```

or to run it in the background

```docker-compose up -d```

Now you can visit [localhost/](http://localhost/) to see the frontend app running
and backend app at port `8088` so admin panel is here [localhost:8088/api/admin/](http://localhost:8088/api/admin/) whithout css

to stop it:

```docker-compose down```
