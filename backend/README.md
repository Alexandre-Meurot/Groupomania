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

**Installer les dépendances depuis le répertoire 'backend' :**
 - `npm install`

**Définir les variables d'environnements :**
 - créer un fichier .env à la racine du backend
 - définir les variables : 
   - `PORT` = Le port sur lequel l'application backend démarre
   - `JWT_SECRET_TOKEN` = clé secrète du token

**Créer la base de données SQL :**
 - installer XAMPP
 - lancer le serveur Apache et MySql via XAMPP
 - ouvrir phpmyadmin via Xampp puis y créer la BDD 'groupomania'
 - `sequelize db:migrate` = pour intégrer les modèles vers la base de données groupomania
 - éxécuter le script ***scripts/users.sql***  via phpMyAdmin (création compte Administrateur*)
 - éxécuter le script ***scripts/posts.sql***  via phpMyAdmin (création premier post de l'admin)

**Lancer le serveur :**
 - `npm start` = lance le script 'start' défini dans le package.json

***Identifiants du compte Administrateur :**
 - email : admin@email.com
 - mot de passe : Password2022