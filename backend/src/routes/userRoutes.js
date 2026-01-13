const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateUserInput } = require("../middleware/validation");

// Apply validation middleware to POST and PUT routes
router.post("/", validateUserInput, userController.createUser);
router.put("/:id", validateUserInput, userController.updateUser);

// Other routes
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);
router.get("/:id/utc-offset", userController.getUserUTCOffset);

module.exports = router;

