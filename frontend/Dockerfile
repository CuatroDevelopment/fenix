# Etapa base
FROM node:24-slim

# Crear directorio de trabajo
WORKDIR /app

# Copiamos solo los archivos de dependencias primero
RUN npm config set registry https://registry.npmmirror.com

COPY package*.json ./

RUN npm ci

COPY . .

# Exponer el puerto Vite por defecto
EXPOSE 5173

# Comando para iniciar Vite en modo desarrollo accesible desde fuera del contenedor
CMD ["npm", "run", "dev", "--", "--host","0.0.0.0"]
