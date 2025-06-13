# Etapa base
FROM node:24-slim

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto Vite por defecto
EXPOSE 5173

# Comando para limpiar .vite y arrancar Vite
CMD ["sh", "-c", "rm -rf node_modules/.vite && npm run dev -- --host 0.0.0.0"]