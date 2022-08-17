# Groupomania Social Network

## Projet n°7 du parcours Développeur Web OpenClassrooms

**Création d'un backend sécurisé API REST NodeJs, outils :**
- Framework Express
- Nodemon pour le développement
- Base de données MariaDB
- ORM Sequelize
- CLI de Sequelize 
- Sécurité : dotenv, helmet, bcrypt, jsonwebtoken ainsi que multer

### Backend : 

**Installer les dépendances :**
 - `npm install`

**Définir les variables d'environnements :**
 - créer un fichier .env à la racine du backend
 - définir les variables : 
   - `PORT` = Le port sur lequel l'application backend démarre
   - `JWT_SECRET_TOKEN` = clé secrète du token
   

**Lancer le serveur :**
 - `npm start` = lance le script 'start' défini dans le package.json