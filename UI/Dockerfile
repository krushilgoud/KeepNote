# Use official node image
FROM node:latest as angularbinary

# Owner of the container
MAINTAINER krushil.goud

# Install TypeScript
RUN npm install -g typescript

# Install Angular cli 
RUN npm install -g @angular/cli

# Create directory
RUN mkdir -p /app

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Generate binaries
RUN ng build

# Base image - Official Alpine NGINX image
FROM nginx:latest

# Owner of the container
MAINTAINER krushil.goud

# Copy the compiled angular distibutions to NGINX public folder
COPY --from=angularbinary /app/dist/ /usr/share/nginx/html

# To tell NGINX, which files to serve under which domain, we need to provide it configuration file.
COPY ./nginx.conf /etc/nginx/conf.d/default.conf