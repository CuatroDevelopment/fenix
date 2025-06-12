# Fennix 

## Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Docker Compose (incluido en Docker Desktop)
-Instalar Node.js (https://nodejs.org/en/download)

despues de instalar node verififcar si se instalo 
```
node -v 
```

y despues npm -v si no detecta el comando entrara a powershell como administrador y ejecutar
```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```



## Comandos Git
Inicializar git
```
git init
```

clonar repositorio
```
git clone https://github.com/CuatroDevelopment/fenix.git
```

Actualizar el repositoio con nuevos cambios 
```
git pull
```

## Comandos Docker

### Levantar contenedores

Comando para levantar los contenedores 
```
docker compose up
```

Comando para bajar los contenedores 
```
docker compose down
```

Comando para eliminar la cache 
```
docker compose build --no-cache
```


