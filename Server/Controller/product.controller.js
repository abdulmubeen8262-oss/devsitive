const { Product } = require("../Model");

// Parse JSON fields sent through FormData
const parseJSONField = (value, fallback) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    const err = new Error("Invalid JSON format in product fields");
    err.statusCode = 400;
    throw err;
  }
};

// CREATE PRODUCT
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      material,
      description,
    } = req.body;

    const product = await Product.create({
      name,
      category,
      material,
      description,

      image: req.file
        ? `/uploads/products/${req.file.filename}`
        : null,

      colors: parseJSONField(req.body.colors, []),
      sizes: parseJSONField(req.body.sizes, []),
      specifications: parseJSONField(
        req.body.specifications,
        {}
      ),
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });

  } catch (error) {
    return next(error);
  }
};

// GET ALL PRODUCTS
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (error) {
    return next(error);
  }
};

// GET SINGLE PRODUCT
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });

  } catch (error) {
    return next(error);
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image =
        `/uploads/products/${req.file.filename}`;
    }

    // Parse JSON fields only when they are provided
    if (req.body.colors !== undefined) {
      updateData.colors = parseJSONField(req.body.colors, []);
    }

    if (req.body.sizes !== undefined) {
      updateData.sizes = parseJSONField(req.body.sizes, []);
    }

    if (req.body.specifications !== undefined) {
      updateData.specifications = parseJSONField(
        req.body.specifications,
        {}
      );
    }

    await product.update(updateData);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });

  } catch (error) {
    return next(error);
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.destroy();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

