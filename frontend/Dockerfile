# Dockerfile del Frontend (React con Vite)
FROM node:18-alpine as build
WORKDIR /app
# COPY package*.json ./
COPY package.json package-lock.json ./
ENV NODE_OPTIONS="--max-old-space-size=2048"
# Install dependencies using npm ci
RUN npm ci
COPY . .
# Declarar el argumento de construcción
ARG VITE_API_URL
ARG VITE_API_URL_SOCKET
# Asignar el argumento de construcción a una variable de entorno
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_URL_SOCKET=$VITE_API_URL_SOCKET


RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
