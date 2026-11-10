import { Query, Product } from "../Model/index.js";

// CREATE QUERY

export const createQuery = async (req, res) => {
  try {
    const { name, email, message, productId } = req.body;

    if (!name || !email || !message || !productId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const query = await Query.create({
      name,
      email,
      message,
      productId,
    });

    res.status(201).json({
      success: true,
      message: "Query submitted successfully",
      data: query,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL QUERIES
export const getQueries = async (req, res) => {
  try {
    const queries = await Query.findAll({
      include: [{
        model: Product,
        attributes: ["id", "name"],
      }],
    });

    res.status(200).json({
      success: true,
      data: queries,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};