
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






