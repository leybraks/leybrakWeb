# Etapa 1: Construcción (Usamos Node para instalar y compilar)
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Asumiendo que usas Vite o React (esto genera la carpeta /dist o /build)
RUN npm run build 

# Etapa 2: Servidor (Usamos Nginx ligero solo para mostrar la web)
FROM nginx:alpine

# Agregamos esta nueva línea para copiar nuestra configuración:
COPY nginx.conf /etc/nginx/conf.d/default.conf

# La línea que ya tenías:
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
