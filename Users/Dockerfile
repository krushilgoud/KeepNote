# Use official node image
FROM node:latest

# Owner of the container
MAINTAINER krushilgoud

# Create directory
RUN mkdir -p /app

# Change working directory
WORKDIR /app

# Copy source code
COPY . /app

# Install dependencies
RUN npm install

# Expose API port to the world
EXPOSE 80

# Define environment variables
ENV MONGO_URL 'mongodb://admin:admin@mongo-users-container:27017/UsersDB'
ENV PORT '80'
ENV AUTH_BASE_URL 'http://authorization-container:80/api/v1/auth'

# Launch application
CMD ["node", "./server/bin/www.js"]