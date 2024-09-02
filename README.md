# NutriScan

**NutriScan** is an AI-powered platform that helps users make informed dietary choices by scanning or uploading images of food and medicine labels. It provides detailed nutritional information, allergen alerts, and dietary suitability based on health conditions. NutriScan also suggests healthier alternatives to promote better dietary habits.

## How to Obtain API Keys and Credentials

. **Create a `.env` file:**  
   Before running the project, you need to create a `.env` file in the `server` directory with the following environment variables:

  ```bash
     DJANGO_SECRET_KEY='<your_django_secret_key>'
     DJANGO_DEBUG=True
     EMAIL_HOST_USER='<your_email_host_user>'
     EMAIL_HOST_PASSWORD='<your_email_host_password>'
     GOOGLE_API_KEY='<your_google_api_key>'
  ```

### Django Secret Key

To generate a new Django secret key, you can use one of the following methods:

1. **Using an Online Tool:**
   - Visit a tool like [Django Secret Key Generator](https://miniwebtool.com/django-secret-key-generator/).
   - Generate a key and copy it.

2. **Using Python Code:**
   - Run the following Python code in your local environment:

     ```python
     from django.core.management.utils import get_random_secret_key
     print(get_random_secret_key())
     ```

   - Copy the generated key.

3. **Update Your `.env` File:**
   - Paste the copied key into your `.env` file as the `DJANGO_SECRET_KEY`:

     ```env
     DJANGO_SECRET_KEY='<your_generated_secret_key>'
     ```

This key is used by Django for cryptographic signing and should be kept secure.

### Google API Key

To obtain a Google API Key, follow these steps:

1. **Go to the Google Cloud Console:**
   - Visit the [Google Cloud Console](https://console.cloud.google.com/).

2. **Create or Select a Project:**
   - Create a new project or select an existing project from the project dropdown.

3. **Navigate to Credentials:**
   - Go to **APIs & Services** > **Credentials**.

4. **Create a New API Key:**
   - Click on **Create Credentials** and select **API Key**.
   - A new API key will be generated and displayed.

5. **Copy the API Key:**
   - Copy the generated API key.

6. **Update Your `.env` File:**
   - Paste the copied key into your `.env` file as `GOOGLE_API_KEY`:

     ```env
     GOOGLE_API_KEY='<your_generated_api_key>'
     ```

   - This API key is used to access Google services and should be kept secure.

### Email Host User and Password

To configure email sending through Gmail, follow these steps:

1. **Use Your Gmail Address:**
   - Set your Gmail address as the `EMAIL_HOST_USER` in your `.env` file.

     ```env
     EMAIL_HOST_USER='<your_gmail_address>'
     ```

2. **Set Up 2-Step Verification:**
   - Go to your [Google Account Security](https://myaccount.google.com/security) settings.
   - Enable **2-Step Verification** if it is not already set up.

3. **Generate an App Password:**
   - Navigate to the [App Passwords](https://myaccount.google.com/security) page in your Google Account.
   - Select **Mail** as the app and **Other** (or the device you are using) as the device.
   - Click **Generate** to create a new app password.

4. **Copy and Use the App Password:**
   - Copy the generated app password.
   - Paste this password into your `.env` file as `EMAIL_HOST_PASSWORD`:

     ```env
     EMAIL_HOST_PASSWORD='<your_generated_app_password>'
     ```

   - This password is used to authenticate your email sending and should be kept secure.



## Getting Started

To set up and run NutriScan locally, follow these steps:

### Prerequisites

1. **Install Docker Desktop:**  
   Ensure that Docker Desktop is installed on your system. You can download it [here](https://www.docker.com/products/docker-desktop/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/nutriscan.git](https://github.com/Fareed95/NutriScan.git
   cd nutriscan
2. **START THE PROJECT**
   ```bash
   docker compose up --build
