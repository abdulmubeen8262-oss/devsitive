const { DataTypes } = require("sequelize");
const sequelize = require("../Config/connection");

const Contact = sequelize.define("Contact", {
    
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

});

module.exports = Contact;
