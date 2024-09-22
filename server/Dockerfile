# Dockerfile for Django

FROM python:3.11

# Set environment variables
ARG DJANGO_SECRET_KEY
ARG DJANGO_DEBUG

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY
ENV DJANGO_DEBUG=$DJANGO_DEBUG

WORKDIR /app
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app/
<<<<<<< HEAD
=======

# Set environment variables from the .env file (optional)
# You may need to handle this differently based on how you manage env variables in Docker
# COPY server/.env /app/server/.env

# Run Django migrations and collect static files (if needed)
>>>>>>> eec1cfec62ee407865dcaff29aa90f1867280dd0
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "server.wsgi:application"]
