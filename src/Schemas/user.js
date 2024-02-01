const { DataTypes } = require('sequelize');
const {sequelize} = require('../databases/conectToPostgretSQL');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    createdAt: false,
    updatedAt: false
})

module.exports = User;