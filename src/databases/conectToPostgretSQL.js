const { Sequelize } = require('sequelize');
const colors = require('colors');

const {
    PASSWORD_USER_POST,
    DATABASE,
    USER_FOR_DATABASE
} = process.env;

const sequelize = new Sequelize(DATABASE, USER_FOR_DATABASE, PASSWORD_USER_POST, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    define: {
        freezeTableName: true
    }
});

async function connectToDatabase() {

    try {
        await sequelize.authenticate();
        console.log(colors.cyan('Connection has been established successfully.'));
    } catch (error) {
        console.error(colors.red('Unable to connect to the database: '), error);
    }

}

module.exports = { connectToDatabase, sequelize };
