const { DataTypes } = require("sequelize");
const sequelize = require("../Config/connection");

const ProductQuery = sequelize.define("ProductQuery", {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  message: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

});

module.exports = ProductQuery;
