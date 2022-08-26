require('dotenv').config()
const jwt = require('jsonwebtoken')

const getAuthUserId = (req) => {

    /*** récupération du token dans le header de la requête d'autorisation et la récupération aprés l'espace du deuxieme élément du tableau qui est le token ***/
    const token = req.headers.authorization.split(" ")[1];

    /*** vérification et décodage du token avec la clé de sécurité ***/

    const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_TOKEN}`);
    /*** décodage du userId ***/

    const userId = decodedToken.userId;

    return userId;
}

module.exports = getAuthUserId;