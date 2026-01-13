const logger = require("../utils/logger");

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  logger.error(`[${req.method} ${req.path}]`, err.message);
  logger.error("Stack trace:", err.stack);

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;

