# Usa una imagen base de Node.js 18 en Alpine
FROM node:18-alpine

# Instala OpenSSL 3.0 y otras dependencias necesarias
RUN apk update && apk add --no-cache \
    openssl3 \
    bash \
    && rm -rf /var/cache/apk/*

# Crea un directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Genera el cliente de Prisma
RUN npm run prisma

# Compila TypeScript a JavaScript
RUN npm run build

# Expone el puerto
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["node", "dist/server.js"]
