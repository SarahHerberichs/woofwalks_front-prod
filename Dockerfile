# Étape 1: Construire l'application (build stage)
FROM node:18-alpine as builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de l'application
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Lancer la commande de build
RUN npm run build

# Étape 2: Servir l'application avec Nginx
FROM nginx:stable-alpine

# Copier le fichier de configuration Nginx (notez le nom mis à jour)
COPY ./nginx.conf.prod /etc/nginx/nginx.conf

# Copier les fichiers de build statiques de l'étape précédente
COPY --from=builder /app/build /usr/share/nginx/html

# Exposer le port 80 pour le trafic web
EXPOSE 80

# Démarrer le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]
