FROM node:18-alpine AS build

LABEL maintainer="Anderson Aguiar"

WORKDIR /usr/src/app

COPY package*json ./

RUN apk update

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

ARG PORT
ARG SOCKETIO_PORT
ARG WEBSOCKET_PORT

EXPOSE 3004

EXPOSE 8001

EXPOSE 8002

CMD ["node", "dist/main.js"]