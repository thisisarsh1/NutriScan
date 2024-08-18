# Dockerfile for Django

# Use the official Python image from the Docker Hub
FROM python:3.11


# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory to /app
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project into the container
COPY . /app/

# Set environment variables from the .env file (optional)
# You may need to handle this differently based on how you manage env variables in Docker
COPY server/.env /app/server/.env

# Run Django migrations and collect static files (if needed)
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

# Start the server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "server.wsgi:application"]
