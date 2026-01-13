import api from "./api";

/**
 * User API service
 */
export const userService = {
  /**
   * Get all users
   */
  getAll: async () => {
    const { data } = await api.get("/api/users");
    return data;
  },

  /**
   * Get user by ID
   */
  getById: async (id) => {
    const { data } = await api.get(`/api/users/${id}`);
    return data;
  },

  /**
   * Create a new user
   */
  create: async (userData) => {
    const { data } = await api.post("/api/users", userData);
    return data;
  },

  /**
   * Update a user
   */
  update: async (id, userData) => {
    const { data } = await api.put(`/api/users/${id}`, userData);
    return data;
  },

  /**
   * Delete a user
   */
  delete: async (id) => {
    await api.delete(`/api/users/${id}`);
  },

  /**
   * Get user UTC offset
   */
  getUTCOffset: async (id) => {
    const { data } = await api.get(`/api/users/${id}/utc-offset`);
    return data;
  },
};

