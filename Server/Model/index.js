import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import sequelize from "../Config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

const files = fs.readdirSync(__dirname).filter(
  (file) =>
    file !== "index.js" &&
    file.endsWith(".js") &&
    !file.startsWith(".")
);

for (const file of files) {
  const modelPath = pathToFileURL(
    path.join(__dirname, file)
  ).href;

  const modelModule = await import(modelPath);
  const model = modelModule.default;

  if (!model || !model.name) {
    throw new Error(`Invalid model: ${file}`);
  }

  db[model.name] = model;

  console.log(`Model loaded: ${model.name}`);
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
