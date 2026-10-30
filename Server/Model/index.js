import fs from "fs"
import path from "path"
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { pathToFileURL } from "url";

const env = process.env.NODE_ENV || "development";
import configFile from "../Config/config.js";
const config = configFile[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//  MODEL FILES ALL READ

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== "index.js" &&
      file.endsWith(".js")
    );
  })
  for (const file of fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 &&
    file !== "index.js" &&
    file.endsWith(".js")
  );
})) {
  const modelPath = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(modelPath);

  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}



// ANY IF ASSOCIATION RUN THAT.

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
