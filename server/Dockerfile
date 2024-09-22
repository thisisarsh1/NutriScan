# Dockerfile for Django

# Use the official Python image from the Docker Hub
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory to /app
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project into the container
COPY . /app/

# Set environment variables from build arguments
ARG DJANGO_SECRET_KEY
ARG DJANGO_DEBUG
ARG EMAIL_HOST_USER
ARG EMAIL_HOST_PASSWORD
ARG GOOGLE_API_KEY

# Set environment variables in the container
ENV DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY
ENV DJANGO_DEBUG=$DJANGO_DEBUG
ENV EMAIL_HOST_USER=$EMAIL_HOST_USER
ENV EMAIL_HOST_PASSWORD=$EMAIL_HOST_PASSWORD
ENV GOOGLE_API_KEY=$GOOGLE_API_KEY

# Run Django migrations and collect static files (if needed)
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

# Start the server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "server.wsgi:application"]
