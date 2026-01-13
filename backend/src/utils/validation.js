/**
 * Validates US ZIP code format (5 digits)
 * @param {string} zip - ZIP code to validate
 * @returns {boolean} - True if valid
 */
function isValidUSZip(zip) {
  return typeof zip === "string" && /^[0-9]{5}$/.test(zip);
}

/**
 * Validates user name
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid
 */
function isValidName(name) {
  return typeof name === "string" && name.trim().length > 0;
}

module.exports = {
  isValidUSZip,
  isValidName,
};

