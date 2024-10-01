#!/bin/bash
############################################
# AUTHOR : FAREED SAYED
# DATE : 01 OCTOBER 2024
# TO CHECK SECRETS BEFORE COMMITTING TO GITHUB
############################################

# Check if the virtual environment exists
if [ -d "venv" ]; then
    echo "Activating the virtual environment..."
    # Activate the virtual environment
    source ./venv/bin/activate
else
    echo "Virtual environment not found. Please create and activate it using 'python3 -m venv venv'."
    exit 1
fi

# Check if detect-secrets is installed
if ! command -v detect-secrets &> /dev/null
then
    echo "detect-secrets is not installed in the virtual environment. Please install it using 'pip install detect-secrets'."
    exit 1
fi

# Run detect-secrets scan to check for any secrets in the codebase
echo "Running detect-secrets scan..."

if [ -f ".secrets.baseline" ]; then
    # If .secrets.baseline exists, run audit mode
    echo "Auditing the existing .secrets.baseline file..."
    detect-secrets audit .secrets.baseline
else
    # If .secrets.baseline doesn't exist, scan for secrets and create the baseline
    echo "No .secrets.baseline found. Scanning for secrets and generating a new baseline..."
    detect-secrets scan > .secrets.baseline
    echo "Secrets baseline has been generated. Review and commit the .secrets.baseline file."
fi

# Check for any detected secrets
if grep -q '"is_secret": true' .secrets.baseline; then
    echo "Secrets detected! Review the .secrets.baseline file using 'detect-secrets audit .secrets.baseline' and resolve any issues."
else
    echo "No secrets detected. You're good to go!"
fi
