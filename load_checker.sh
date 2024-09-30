#!/bin/bash

# Set the URLs for your apps
DJANGO_URL="https://nutriscan-1ahz.onrender.com/"
NEXT_URL="https://nutriscann.vercel.app/"

# Number of requests
REQUESTS=100
# Number of concurrent users
CONCURRENCY=10

echo "Testing Django App..."
ab -n $REQUESTS -c $CONCURRENCY $DJANGO_URL

echo "Testing Next.js App..."
ab -n $REQUESTS -c $CONCURRENCY $NEXT_URL
