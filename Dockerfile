FROM node:18-alpine AS build

LABEL maintainer="Anderson Aguiar"

WORKDIR /usr/src/app

COPY package*json ./

RUN apk update

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3004

CMD ["node", "dist/main.js"]