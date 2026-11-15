const { body } = require("express-validator");

const createContactValidation = [
  body("fullName")
    .trim()
    .notEmpty().withMessage("Full name is required")
    .isLength({ max: 100 }).withMessage("Name is too long"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .bail()
    .isEmail().withMessage("Enter a valid email"),

  body("phone")
    .trim()
    .notEmpty().withMessage("Phone is required")
    .isLength({ max: 20 }).withMessage("Phone number is too long"),

  body("subject")
    .trim()
    .notEmpty().withMessage("Subject is required")
    .isLength({ max: 150 }).withMessage("Subject is too long"),

  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .isLength({ max: 5000 }).withMessage("Message is too long"),
];

module.exports = { createContactValidation };
