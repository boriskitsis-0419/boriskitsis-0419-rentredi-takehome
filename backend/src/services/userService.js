const { usersRef } = require("../config/firebase");
const { getLocationData } = require("./weatherService");
const { v4: uuidv4 } = require("uuid");

/**
 * Creates a new user with location data
 * @param {string} name - User name
 * @param {string} zipCode - ZIP code
 * @returns {Promise<Object>} - Created user object
 */
async function createUser(name, zipCode) {
  const id = uuidv4();
  const { latitude, longitude, timezone } = await getLocationData(zipCode);

  const user = {
    id,
    name: name.trim(),
    zip_code: zipCode,
    latitude,
    longitude,
    timezone,
  };

  await usersRef.child(id).set(user);
  return user;
}

/**
 * Gets all users
 * @returns {Promise<Array>} - Array of user objects
 */
async function getAllUsers() {
  const snap = await usersRef.get();
  const val = snap.val() || {};
  return Object.values(val);
}

/**
 * Gets a user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object|null>} - User object or null if not found
 */
async function getUserById(id) {
  const snap = await usersRef.child(id).get();
  if (!snap.exists()) {
    return null;
  }
  return snap.val();
}

/**
 * Updates a user
 * @param {string} id - User ID
 * @param {Object} updates - Update object with optional name and/or zip_code
 * @returns {Promise<Object>} - Updated user object
 */
async function updateUser(id, updates) {
  const existing = await getUserById(id);
  if (!existing) {
    return null;
  }

  const updated = { ...existing };

  if (updates.name !== undefined) {
    updated.name = updates.name.trim();
  }

  if (updates.zip_code !== undefined && updates.zip_code !== existing.zip_code) {
    updated.zip_code = updates.zip_code;
    const { latitude, longitude, timezone } = await getLocationData(updates.zip_code);
    updated.latitude = latitude;
    updated.longitude = longitude;
    updated.timezone = timezone;
  }

  await usersRef.child(id).set(updated);
  return updated;
}

/**
 * Deletes a user
 * @param {string} id - User ID
 * @returns {Promise<boolean>} - True if deleted, false if not found
 */
async function deleteUser(id) {
  const existing = await getUserById(id);
  if (!existing) {
    return false;
  }

  await usersRef.child(id).remove();
  return true;
}

/**
 * Formats UTC offset from timezone seconds
 * @param {number} timezoneSeconds - Timezone offset in seconds
 * @returns {string} - Formatted UTC offset (e.g., "UTC+5", "UTC-8")
 */
function formatUTCOffset(timezoneSeconds) {
  const hours = timezoneSeconds / 3600;
  const sign = hours >= 0 ? "+" : "-";
  return `UTC${sign}${Math.abs(hours)}`;
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  formatUTCOffset,
};

