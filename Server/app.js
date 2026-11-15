const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully!"
  });
});

app.use( "/api/v1/products",require("./Router/Product.routes"));
app.use("/api/v1/query",require("./Router/Query.Routes"));
app.use("/api/v1/contact",require("./Router/Contact.Routes"));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


module.exports = app;
