import { DataTypes } from "sequelize";
import sequelize from "../Config/db.js";

const Query = sequelize.define("Query", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phone: {
  type: DataTypes.STRING,
  allowNull: true,
},
subject: {
  type: DataTypes.STRING,
  allowNull: false,
},
});

export default Query;