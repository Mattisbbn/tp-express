## Prérequis
- Node.js (>= 20)
- npm
- Docker (pour la production)

## Installation (développement)
1. Cloner le dépôt ou placer les fichiers dans le dossier du projet.
2. Installer les dépendances :
```bash
npm install
```
3. Démarrer en mode développement (démarre nodemon) :
```bash
npm start
```

## Production (Docker)
1. Construire l'image :
```bash
docker build -t tpserver .
```
2. Lancer le conteneur (exposez le port souhaité, ici 3000) :
```bash
docker run -d -p 3000:3000 --env-file .env --name tpserver tpserver
```
