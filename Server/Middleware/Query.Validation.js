const { body } = require("express-validator");

const createQueryValidation = [
  body("productId")
    .notEmpty().withMessage("Product ID is required")
    .bail()
    .isInt({ min: 1 }).withMessage("Invalid Product ID"),

  body("name")
    .trim()
    .notEmpty().withMessage("Name is required"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .bail()
    .isEmail().withMessage("Enter a valid email"),

  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Message cannot exceed 255 characters"),
];

module.exports = { createQueryValidation };
