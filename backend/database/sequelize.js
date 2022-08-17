const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'groupomania',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb'
    }
)

sequelize.authenticate()
    .then(_ => console.log('La connexion à la BDD a réussi !'))
    .catch(error => console.error(`Impossible de se connecter à la BDD ${error}`))

module.exports