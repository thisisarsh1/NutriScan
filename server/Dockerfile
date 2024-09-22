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
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "server.wsgi:application"]
