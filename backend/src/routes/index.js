const express = require("express");
const router = express.Router();

/**
 * Root endpoint
 */
router.get("/", (req, res) => {
  const companyName = process.env.COMPANY_NAME || "RentRedi";
  res.json({
    message: `Welcome to the ${companyName} interview!`,
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
    },
  });
});

module.exports = router;

