# Groupomania Social Network : BACKEND

## Projet n°7 du parcours Développeur Web OpenClassrooms

**Création d'un backend sécurisé API REST NodeJs, outils :**
- Framework Express
- Nodemon pour le développement
- Base de données MariaDB
- ORM Sequelize
- CLI de Sequelize 
- Sécurité : dotenv, helmet, bcrypt, jsonwebtoken ainsi que multer

### Installation : 

**Installer le CLI de Sequelize :**
- `npm install --save-dev sequelize-cli`

**Installer les dépendances depuis le répertoire 'backend' :**
 - `npm install`

**Définir les variables d'environnements :**
 - créer un fichier .env à la racine du backend
 - définir les variables : 
   - `PORT` = Le port sur lequel l'application backend démarre
   - `JWT_SECRET_TOKEN` = clé secrète du token

**Créer la base de données SQL (méthode 1) :**
 - installer XAMPP
 - lancer le serveur Apache et MySql via XAMPP
 - ouvrir phpmyadmin via Xampp puis y créer la BDD 'groupomania'
 - `sequelize db:migrate` = pour intégrer les modèles vers la base de données groupomania
 - éxécuter le script ***scripts/users.sql***  via phpMyAdmin (création compte Administrateur*)
 - éxécuter le script ***scripts/posts.sql***  via phpMyAdmin (création premier post de l'admin)

**Créer la base de données SQL (méthode 2) :**
 - créer la BDD 'groupomania' via le serveur local de votre choix
 - éxécuter le script Meurot_Alexandre_bdd_112022

**Lancer le serveur :**
 - `npm start` = lance le script 'start' défini dans le package.json
