# --- Étape 1 : Construction (Builder) ---
FROM node:25-alpine AS builder

WORKDIR /app

# On copie les fichiers de définition (package.json et lock)
COPY package*.json ./

# On installe les dépendances (clean install) pour la prod
RUN npm ci --only=production

# --- Étape 2 : Exécution (Runtime) ---
FROM node:25-alpine

WORKDIR /app

# Bonne pratique : définir la variable d'environnement explicitement
ENV NODE_ENV=production
ENV PORT=8080

# 1. On copie les modules node PROPRES depuis l'étape 'builder'
COPY --from=builder /app/node_modules ./node_modules

# 2. On copie le reste de ton code source (depuis ton dossier vers l'image)
COPY . .

RUN npx prisma generate

# Exposition du port (documentation pour Docker)
EXPOSE 8080

# Utiliser l'utilisateur 'node' (non-root) par sécurité, au lieu de root
USER node

# Lancement
CMD ["node", "./bin/www"]