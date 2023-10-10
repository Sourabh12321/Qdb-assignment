const Sequelize = require("sequelize");
require("dotenv").config();


const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.URNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
  }
);

module.exports = { sequelize };