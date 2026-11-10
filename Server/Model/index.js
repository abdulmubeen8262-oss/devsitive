import Product from "./Product.js";
import Category from "./Category.js";
import Query from "./Query.js";

Category.hasMany(Product, {
  foreignKey: "categoryId",
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
});

Product.hasMany(Query, {
  foreignKey: "productId",
});

Query.belongsTo(Product, {
  foreignKey: "productId",
});

export { Product, Category, Query };


































//yeh lines comment hai... import fs from "fs";
//yeh lines comment hai... import path from "path";
//yeh lines comment hai... import Sequelize from "sequelize";
//yeh lines comment hai... import { fileURLToPath } from "url";

 // const __filename = fileURLToPath(import.meta.url);
 //const __dirname = path.dirname(__filename);
//import { pathToFileURL } from "url";

//const env = process.env.NODE_ENV || "development";
//import configFile from "../Config/config.js";
//const config = configFile[env];
//const db = {};

//const sequelize = new Sequelize(
 // config.database,
  //config.username,
 // config.password,
 // config
//);

//  READ ALL MODEL FILES
//fs.readdirSync(__dirname)
  //.filter((file) => {
    //return (
      //file.indexOf(".") !== 0 &&
  // file !== "index.js" &&
    //  file.endsWith(".js")
  //  );
 // })
 // for (const file of fs.readdirSync(__dirname).filter((file) => {
 // return (
   // file.indexOf(".") !== 0 &&
    //file !== "index.js" &&
    ///file.endsWith(".js")
 // );
//})) {
 // const modelPath = pathToFileURL(path.join(__dirname, file)).href;
 // const modelModule = await import(modelPath);

 // const model = modelModule.default(sequelize, Sequelize.DataTypes);
 // db[model.name] = model;
//}


// RUN ASSOCIATIONS IF ANY
//Object.keys(db).forEach((modelName) => {
 // if (db[modelName].associate) {
  //  db[modelName].associate(db);
 // }
//});

//db.sequelize = sequelize;

//export default db;
