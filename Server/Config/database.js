
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import configFile from "./config.js";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export default sequelize;
