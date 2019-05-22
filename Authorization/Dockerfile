# Use official node image
FROM node:latest

# Owner of the container
MAINTAINER krushilgoud

# Create directory
RUN mkdir -p /app

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Expose API port to the world
EXPOSE 80

# Define environment variables
ENV PORT '80'
ENV JWT_SECRET 'jwt-secret-key'
ENV TOKEN_EXPIRE '1h'

# Launch application
CMD ["node", "./server/bin/www.js"]