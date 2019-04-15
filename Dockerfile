# Pull base image
FROM ubuntu:16.04

RUN apt-get update && apt-get install -y nginx nginx-extras

# Expost port 80
EXPOSE 80

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Make app directory (assumes files are compiled before creating image)
RUN mkdir -p /usr/src/website

COPY src/ /usr/src/website

# Start nginx
CMD sh -c "nginx -g 'daemon off;'"