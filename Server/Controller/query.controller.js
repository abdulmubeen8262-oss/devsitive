const { Product, ProductQuery } = require("../Model");

// CREATE QUERY
const createQuery = async (req, res, next) => {
  try {
    const { productId, name, email, message } = req.body;

    if (!productId || !name || !email || !message) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    if (
      typeof message !== "string" ||
      message.trim().length > 255
    ) {
      const error = new Error(
        "Message must not exceed 255 characters"
      );
      error.statusCode = 400;
      throw error;
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    const query = await ProductQuery.create({
      productId: product.id,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Product query submitted successfully",
      data: query,
    });

  } catch (error) {
    return next(error);
  }
};

// GET ALL QUERIES
const getAllQueries = async (req, res, next) => {
  try {
    const queries = await ProductQuery.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "name", "category"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: queries.length,
      data: queries,
    });

  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createQuery,
  getAllQueries,
};
