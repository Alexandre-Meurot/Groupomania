const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {

    try {
        /*** récupération du token dans le header de la requête d'autorisation et la récupération aprés l'espace du deuxieme élément du tableau qui est le token ***/
        const token = req.headers.authorization.split(' ')[1];

        /*** vérification et décodage du token avec la clé de sécurité ***/
        const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_TOKEN}`);

        /*** décodage du isAdmin ***/
        const isAdmin = decodedToken.isAdmin;

        if (isAdmin !== true) {
            return res.status(401).json({ message: 'Accès reservé à l\'administrateur !' }) ;

        } else {
            next();
        }

    } catch {
        res.status(401).json({ message: 'Une erreur est survenue !' });
    }
};