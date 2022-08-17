module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING,
            defaultValue: 'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png'
        },
        bio: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: true
    })
}