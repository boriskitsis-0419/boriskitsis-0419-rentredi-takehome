const axios = require("axios");

/**
 * Geocodes a ZIP code to get latitude and longitude
 * @param {string} zip - ZIP code
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
async function geocodeZip(zip) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const country = process.env.OPENWEATHER_COUNTRY_CODE || "US";
  
  if (!apiKey) {
    throw new Error("Missing OPENWEATHER_API_KEY in env");
  }

  const url = `https://api.openweathermap.org/geo/1.0/zip`;
  
  try {
    const resp = await axios.get(url, {
      params: { zip: `${zip},${country}`, appid: apiKey },
      timeout: 8000,
    });

    const { lat, lon } = resp.data || {};
    if (typeof lat !== "number" || typeof lon !== "number") {
      throw new Error("Geocoding API returned invalid lat/lon");
    }
    
    return { latitude: lat, longitude: lon };
  } catch (error) {
    // Handle invalid zip code errors from OpenWeather API
    if (error.response && (error.response.status === 404 || error.response.status === 400)) {
      const customError = new Error(`Zip code ${zip} could not be found.`);
      customError.statusCode = 400;
      throw customError;
    }
    // Re-throw other errors
    throw error;
  }
}

/**
 * Fetches timezone offset in seconds from UTC for given coordinates
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {Promise<number>} - Timezone offset in seconds
 */
async function fetchTimezoneSeconds(latitude, longitude) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error("Missing OPENWEATHER_API_KEY in env");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather`;
  const resp = await axios.get(url, {
    params: { lat: latitude, lon: longitude, appid: apiKey },
    timeout: 8000,
  });

  const tz = resp.data?.timezone;
  if (typeof tz !== "number") {
    throw new Error("Current Weather API returned invalid timezone");
  }
  
  return tz; // seconds offset from UTC
}

/**
 * Fetches location data (lat, lon, timezone) for a ZIP code
 * @param {string} zip - ZIP code
 * @returns {Promise<{latitude: number, longitude: number, timezone: number}>}
 */
async function getLocationData(zip) {
  const { latitude, longitude } = await geocodeZip(zip);
  const timezone = await fetchTimezoneSeconds(latitude, longitude);
  
  return { latitude, longitude, timezone };
}

module.exports = {
  geocodeZip,
  fetchTimezoneSeconds,
  getLocationData,
};

