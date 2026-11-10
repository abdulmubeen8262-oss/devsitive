import express from "express";
import dotenv from "dotenv";
import router from "./Router/index.js";
import { Product,Category,Query } from "./Model/index.js";
import cors from "cors";
import sequelize from "./Config/db.js";

dotenv.config();


const app = express();

// Request logger
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Server is running");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


const server = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    // Create tables in dependency order
    await Category.sync();
    console.log("Categories table created");

    await Product.sync();
    console.log("Products table created");

    await Query.sync();
    console.log("Queries table created");

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server is running on port ${process.env.PORT || 5000}`
      );
    });

  } catch (error) {
    console.error("Unable to start server:", error);
  }
};

server();



