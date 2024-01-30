const { Sequelize } = require('sequelize');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize('real-time-chat', 'postgres', process.env.PASSWORD_POSTGREsql, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

async function connectToDatabase() {

    try {
        await sequelize.authenticate();
        console.log(colors.cyan('Connection has been established successfully.'));
    } catch (error) {
        console.error(colors.red('Unable to connect to the database: '), error);
    }

}

module.exports = connectToDatabase;
