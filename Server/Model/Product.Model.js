const { DataTypes } = require("sequelize");
const sequelize = require("../Config/connection");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  material: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  colors: {
    type: DataTypes.JSON,
    defaultValue: [],
  },

  sizes: {
    type: DataTypes.JSON,
    defaultValue: [],
  },

  specifications: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
});

module.exports = Product;

