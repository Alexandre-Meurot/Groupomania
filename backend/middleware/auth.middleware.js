const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        req.authorization = {
            userId: userId,
            isAdmin: isAdmin
        }
        next()
    } catch (error) {
        res.status(401).json({ error: 'Requête non authentifiée'});
    }
};