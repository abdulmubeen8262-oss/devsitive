import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./Router/index.js";
import db from "./Model/index.js";

const app = express();
import path from "path";

app.use(
  "/uploads",
  express.static(path.resolve("uploads"))
);
// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Request logger
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Body parsers
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/v1", router);

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  const statusCode =
    Number.isInteger(err.statusCode) &&
    err.statusCode >= 400 &&
    err.statusCode <= 599
      ? err.statusCode
      : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start server
const startServer = async () => {
  try {
    await db.sequelize.authenticate();

    console.log("Database connected successfully");

    await db.sequelize.sync({ alter: true });

    console.log("Database synchronized successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

startServer();
