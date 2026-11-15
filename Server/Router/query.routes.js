
const express = require("express");
const router = express.Router();

const {
  createQuery,
  getAllQueries,
} = require("../Controller/Query.Controller");

const validate = require("../Middleware/validate");

const {
  createQueryValidation,
} = require("../Middleware/Query.Validation");

router.post(
  "/",
  createQueryValidation,
  validate,
  createQuery
);

router.get("/", getAllQueries);

module.exports = router;

