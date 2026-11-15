require("dotenv").config();

const app = require("./app");
const sequelize = require("./Config/connection");

// Load all database models and associations
require("./Model");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    // Sync all registered models
    await sequelize.sync();
    console.log("Database synchronized successfully!");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Home: http://localhost:${PORT}/`);
      console.log(`API: http://localhost:${PORT}/api/v1`);
      console.log(`Products: http://localhost:${PORT}/api/v1/products`);
      console.log(`Query: http://localhost:${PORT}/api/v1/query`);
      console.log(`Contact: http://localhost:${PORT}/api/v1/contact`);
    });

  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

startServer();

