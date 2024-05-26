# Usa una imagen base de Node.js 16
FROM node:18-alpine

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
