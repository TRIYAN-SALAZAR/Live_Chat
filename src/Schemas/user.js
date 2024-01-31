const { DataTypes, Model } = require('sequelize');
const sequelize = require('../databases/conectToPostgretSQL');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Users',
})

module.exports = User;