
const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../Controller/Product.Controller");

const upload = require("../Middleware/uploads");
const validate = require("../Middleware/validate");

const {
  createProductValidation,
  updateProductValidation,
  productIdValidation,
} = require("../Middleware/Product.Validation");

router.post(
  "/",
  upload.single("image"),
  createProductValidation,
  validate,
  createProduct
);

router.get("/", getAllProducts);

router.get(
  "/:id",
  productIdValidation,
  validate,
  getProductById
);

router.put(
  "/:id",
  upload.single("image"),
  updateProductValidation,
  validate,
  updateProduct
);

router.delete(
  "/:id",
  productIdValidation,
  validate,
  deleteProduct
);

module.exports = router;

