const { Sequelize } = require('sequelize');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config();
async function connectToDatabase() {
    const {
        PASSWORD_TRIYA,
        DATABASE,
        USER_FOR_DATABASE
    } = process.env;
    
    const sequelize = new Sequelize(DATABASE, USER_FOR_DATABASE, PASSWORD_TRIYA, {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432
    });

    try {
        await sequelize.authenticate();
        console.log(colors.cyan('Connection has been established successfully.'));
    } catch (error) {
        console.error(colors.red('Unable to connect to the database: '), error);
    }

}

module.exports = connectToDatabase;
