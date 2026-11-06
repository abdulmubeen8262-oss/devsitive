import { DataTypes } from "sequelize";
import sequelize from "../Config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    fullName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: "full_name",
    },

    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },

    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    cnic: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },

    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    gender: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "password_hash",
    },

    profilePicture: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "profile_picture",
    },

    accountType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "account_type",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);

export default User;