const multer = require("multer");
const { ValidationError, UniqueConstraintError } =
  require("sequelize");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Multer errors
  if (err instanceof multer.MulterError) {
    let message = "File upload failed";

    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File size cannot exceed 5 MB";
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      message = "Unexpected file field";
    }

    return res.status(400).json({
      success: false,
      message,
      error: err.code,
    });
  }

  // Invalid file type
  if (err.message === "Only JPG, PNG and WEBP images are allowed") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Sequelize validation
  if (err instanceof UniqueConstraintError ||
      err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      message: "Database validation failed",
      errors: err.errors.map((item) => ({
        field: item.path,
        message: item.message,
      })),
    });
  }

  // Default server error
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.statusCode
      ? err.message
      : "Internal server error",
  });
};

module.exports = errorHandler;
