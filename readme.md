
Lo primero que hay que hacer es crear la carpeta lstapp/frontend lstapp/backend en 
/var/www 


Dependiendo de la memoria del servidor, debemos hacer el build en el servidor 
si no lo unico que hay que hacer es enviar un commit con '[both]'
push origin main 

Si tiene poca memoria, se copiaran los archivos pero fallara el build


Probablemente salga error en el backend. Por que labase de datos esta en el compose del backend
cd backend 
docker compose up -d --build construye la iamgen de postgress
cd .. 
docker-compose build backend 

si hubo error en el build entonces habria que entrar a la ubicacion de la app /var/www/lstapp y hacer un build
docker compose build 

entrar a el contenedor del backend

docker exec -it lstapp-backend-1 /bin/sh

npm run migrate
npm run seeds 

No olvidar generar los certficiados ssl con lets encrypt
 sudo certbot --nginx -d livescoretracking.online -d www.livescoretracking.online -d api.livescoretracking.online

server {
    if ($host = www.livescoretracking.online) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = livescoretracking.online) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name livescoretracking.online www.livescoretracking.online;

    # Redirigir tráfico HTTP a HTTPS
    return 301 https://$host$request_uri;




}

server {
    listen 443 ssl;
    server_name livescoretracking.online www.livescoretracking.online;

    # Configuración SSL
    ssl_certificate /etc/letsencrypt/live/livescoretracking.online/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/livescoretracking.online/privkey.pem; # managed by Certbot

    # Redirigir las solicitudes al frontend en localhost:3000
    location / {
        proxy_pass http://localhost:3000;  # Dirección del frontend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }


}

# Bloque para el backend (api.livescoretracking.com)
server {
    if ($host = api.livescoretracking.online) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name api.livescoretracking.online;

    # Redirigir tráfico HTTP a HTTPS
    return 301 https://$host$request_uri;


}

server {
    listen 443 ssl;
    server_name api.livescoretracking.online;

    # Configuración SSL
    ssl_certificate /etc/letsencrypt/live/livescoretracking.online/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/livescoretracking.online/privkey.pem; # managed by Certbot

    # Redirigir las solicitudes al backend en localhost:3001
    location / {
        proxy_pass http://localhost:3001;  # Dirección del backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

     location /socket.io/ {
        proxy_pass http://localhost:3001;  # Dirección de tu backend donde Socket.IO está corriendo
        proxy_http_version 1.1;  # Necesario para WebSocket
        proxy_set_header Upgrade $http_upgrade;  # Permite la actualización a WebSocket
        proxy_set_header Connection 'upgrade';  # Asegura que la conexión se mantenga abierta
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}


