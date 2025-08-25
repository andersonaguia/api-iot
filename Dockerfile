# =============================
# STAGE 1 - BUILD
# =============================
FROM node:18-alpine AS build

LABEL maintainer="Anderson Aguiar"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

# =============================
# STAGE 2 - RUNTIME
# =============================
FROM node:18-alpine AS runtime

# instala tzdata para suportar timezone
RUN apk add --no-cache tzdata

# define timezone padrão
ENV TZ=America/Sao_Paulo

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY package*.json ./

CMD ["node", "dist/main.js"]
