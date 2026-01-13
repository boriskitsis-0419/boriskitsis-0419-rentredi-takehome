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
        setError(null);
        const newUser = await userService.create(userData);
        // Optimistically add the new user to the list
        setUsers((prevUsers) => [...prevUsers, newUser]);
      } catch (err) {
        setError(err.message || "Failed to create user");
        throw err;
      }
    },
    []
  );

  const updateUser = useCallback(
    async (id, userData) => {
      try {
        setError(null);
        const updatedUser = await userService.update(id, userData);
        // Optimistically update only the specific user in the list
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === id ? updatedUser : user))
        );
      } catch (err) {
        setError(err.message || "Failed to update user");
        throw err;
      }
    },
    []
  );

  const deleteUser = useCallback(
    async (id) => {
      try {
        setError(null);
        await userService.delete(id);
        // Optimistically remove the user from the list
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (err) {
        setError(err.message || "Failed to delete user");
        throw err;
      }
    },
    []
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

