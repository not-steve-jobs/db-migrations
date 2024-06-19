FROM node:16.18.1-alpine
# We need to use apline image here otherwise we are unable to run npm ci command

WORKDIR /opt/direct/migrations-tool
COPY . .
