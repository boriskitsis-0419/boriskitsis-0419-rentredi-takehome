import { useState, useEffect, useCallback } from "react";
import { userService } from "../services/userService";

/**
 * Custom hook for managing users
 */
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Failed to load users");
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(
    async (userData) => {
      try {
        await userService.create(userData);
        await loadUsers();
      } catch (err) {
        setError(err.message || "Failed to create user");
        throw err;
      }
    },
    [loadUsers]
  );

  const updateUser = useCallback(
    async (id, userData) => {
      try {
        await userService.update(id, userData);
        await loadUsers();
      } catch (err) {
        setError(err.message || "Failed to update user");
        throw err;
      }
    },
    [loadUsers]
  );

  const deleteUser = useCallback(
    async (id) => {
      try {
        await userService.delete(id);
        await loadUsers();
      } catch (err) {
        setError(err.message || "Failed to delete user");
        throw err;
      }
    },
    [loadUsers]
  );

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};

