const { body, param } = require("express-validator");

const createProductValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Product name is required"),

  body("category")
    .trim()
    .notEmpty().withMessage("Category is required"),

  body("material")
    .trim()
    .notEmpty().withMessage("Material is required"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required"),
];

const updateProductValidation = [
  param("id")
    .isInt({ min: 1 }).withMessage("Invalid product ID"),

  body("name").optional().trim().notEmpty(),
  body("category").optional().trim().notEmpty(),
  body("material").optional().trim().notEmpty(),
  body("description").optional().trim().notEmpty(),
];

const productIdValidation = [
  param("id")
    .isInt({ min: 1 }).withMessage("Invalid product ID"),
];

module.exports = {
  createProductValidation,
  updateProductValidation,
  productIdValidation,
};
