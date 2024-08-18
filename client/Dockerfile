# Use Node.js 20 image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose ports
EXPOSE 3000
EXPOSE 8000        

# Run both commands
CMD ["sh", "-c", "npm run dev & npm run server"]
