# Dockerfile
FROM node:18-alpine

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet dans le conteneur
COPY . .

# Exposer le port (Azure injecte PORT)
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]