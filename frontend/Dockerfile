# ---------- Etapa 1: Build del frontend ----------
FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# ---------- Etapa 2: Servir el build ----------
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Agregamos configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80



