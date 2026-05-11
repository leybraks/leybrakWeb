FROM node:20-alpine
WORKDIR /app

# Copiamos solo los archivos de dependencias primero (optimiza caché)
COPY package*.json ./

# Instalamos dependencias (solo las de producción para no saturar el servidor)
RUN npm install --production

# Copiamos el resto de tu código del backend
COPY . .

# Expone el puerto que use tu index.js (asumiré que es el 3000, cámbialo si usas otro)
EXPOSE 3000

# Comando para encender la API
CMD ["node", "src/index.js"]
