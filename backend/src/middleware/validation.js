const { isValidUSZip, isValidName } = require("../utils/validation");

/**
 * Validates user creation/update request body
 */
const validateUserInput = (req, res, next) => {
  const { name, zip_code } = req.body || {};

  // For POST requests, both fields are required
  if (req.method === "POST") {
    if (!isValidName(name)) {
      return res.status(400).json({ error: "name is required (non-empty string)" });
    }
    if (!isValidUSZip(zip_code)) {
      return res.status(400).json({ error: "zip_code is required (5 digits)" });
    }
  }

  // For PUT requests, validate only provided fields
  if (req.method === "PUT") {
    if (name !== undefined && !isValidName(name)) {
      return res.status(400).json({ error: "name must be a non-empty string" });
    }
    if (zip_code !== undefined && !isValidUSZip(zip_code)) {
      return res.status(400).json({ error: "zip_code must be 5 digits" });
    }
  }

  next();
};

module.exports = {
  validateUserInput,
};

