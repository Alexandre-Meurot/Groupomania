const db = require('../models');
const User = db.User;
const getAuthUserId = require('./getAuthUserId.middleware')
const jwt = require("jsonwebtoken");

const checkAuthMiddleware = async (req, res, next) => {

    try {

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        const userId = decodedToken.userId;

        const userAuthor =  await User.findOne({
            where: { id: req.params.id }
        })

        const userAdmin = await User.findOne({
            where: { id: getAuthUserId(req) }
        })

        const isAdmin = await userAdmin.dataValues.isAdmin
        const idUserAuthor = await userAuthor.dataValues.id

        console.log("Id de l'auteur === " + idUserAuthor)
        console.log("Mon Id === " + userId)


        if (isAdmin === true) {

            next();

        } else if (userId === idUserAuthor) {

            next();

        } else {

            return res.status(401).json({ message: 'Accès reservé à l\'auteur ou à l\'administrateur !' }) ;

        }

    } catch (error) {

        res.status(401).json({ message: 'Une erreur est survenue !' });

    }
}

module.exports = checkAuthMiddleware