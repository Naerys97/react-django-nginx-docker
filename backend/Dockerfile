FROM python:3.10.8-alpine

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

RUN #apk update && apk add postgresql-dev gcc python3-dev musl-dev
# Build psycopg2-binary from source -- add required required dependencies
#RUN apk add --virtual .build-deps --no-cache postgresql-dev gcc python3-dev musl-dev && \
#        pip install --no-cache-dir -r requirements.txt && \
#        apk --purge del .build-deps

# install dependencies
RUN pip install --upgrade pip
COPY requirements.dev.txt ./

RUN pip install -r requirements.prod.txt
EXPOSE 8000
# copy entrypoint.sh
COPY ./entrypoint.sh .

RUN sed -i 's/\r$//g' /app/backend/entrypoint.sh
RUN chmod +x /app/backend/entrypoint.sh

# copy project
COPY . .

# run entrypoint.sh
ENTRYPOINT ["/app/backend/entrypoint.sh"]
#CMD python manage.py runserver 0.0.0.0:8000
