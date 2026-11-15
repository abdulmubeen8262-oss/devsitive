const express = require("express");
const router = express.Router();

const {
  createContact,
  getAllContacts,
} = require("../Controller/Contact.Controller");

const validate = require("../Middleware/validate");

const {
  createContactValidation,
} = require("../Middleware/Contact.Validation");

router.post(
  "/",
  createContactValidation,
  validate,
  createContact
);

router.get("/", getAllContacts);

module.exports = router;

