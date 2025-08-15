FROM node:18-alpine AS build

LABEL maintainer="Anderson Aguiar"

WORKDIR /usr/src/app

COPY package*json ./

RUN apk update

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

<<<<<<< Updated upstream
ARG PORT
ARG SOCKETIO_PORT
ARG WEBSOCKET_PORT

EXPOSE ${PORT}
=======
EXPOSE 3004
>>>>>>> Stashed changes

EXPOSE ${SOCKETIO_PORT}

EXPOSE ${WEBSOCKET_PORT}

CMD ["node", "dist/main.js"]