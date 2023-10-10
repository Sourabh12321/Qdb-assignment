const { sequelize } = require("../config/db");
const Sequelize = require("sequelize");

const User = sequelize.define(
    "qusers",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },  
      name: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true,     
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      image: {
        type: Sequelize.STRING, 
        allowNull: false,        
      },
      lastLogin: {
        type: Sequelize.DATE,   
        allowNull: false,        
        
      },
    },
  );

  

module.exports = { User };