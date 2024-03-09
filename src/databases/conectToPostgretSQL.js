const { Sequelize } = require("sequelize");

const { PASSWORD_USER_POST, DATABASE, USER_FOR_DATABASE } = process.env;

const sequelize = new Sequelize(
  DATABASE,
  USER_FOR_DATABASE,
  PASSWORD_USER_POST,
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    define: {
      freezeTableName: true,
    },
  },
);

module.exports = { sequelize };
