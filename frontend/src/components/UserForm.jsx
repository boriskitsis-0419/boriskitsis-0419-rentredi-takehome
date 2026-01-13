import { useState } from "react";

/**
 * Form component for creating a new user
 */
const UserForm = ({ onSubmit, loading = false }) => {
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !zip.trim()) return;

    try {
      await onSubmit({ name: name.trim(), zip_code: zip.trim() });
      setName("");
      setZip("");
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, marginBottom: 24 }}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 10, flex: 1 }}
        required
        disabled={loading}
      />
      <input
        placeholder="Zip code (5 digits)"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        style={{ padding: 10, width: 180 }}
        required
        pattern="[0-9]{5}"
        maxLength={5}
        disabled={loading}
      />
      <button type="submit" style={{ padding: "10px 16px" }} disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
};

export default UserForm;

