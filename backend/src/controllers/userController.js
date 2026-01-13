const userService = require("../services/userService");

/**
 * Create a new user
 */
const createUser = async (req, res, next) => {
  try {
    const { name, zip_code } = req.body;
    const user = await userService.createUser(name, zip_code);
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * Get all users
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

/**
 * Get a user by ID
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    return res.json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * Update a user
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, zip_code } = req.body;
    
    const updated = await userService.updateUser(id, { name, zip_code });
    
    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }
    
    return res.json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a user
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);
    
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

/**
 * Get user's UTC offset
 */
const getUserUTCOffset = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    return res.json({
      id,
      zip_code: user.zip_code,
      timezone_seconds: user.timezone,
      utc_offset: userService.formatUTCOffset(user.timezone),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserUTCOffset,
};

