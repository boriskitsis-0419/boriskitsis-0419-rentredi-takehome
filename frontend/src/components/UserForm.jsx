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
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, '');
          if (value.length <= 5) {
            setZip(value);
          }
        }}
        style={{ padding: 10, width: 180 }}
        required
        pattern="[0-9]{5}"
        maxLength={5}
        disabled={loading}
        type="text"
        inputMode="numeric"
      />
      <button 
        type="submit" 
        style={{ 
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4A90E2",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "500",
          boxShadow: "0 2px 4px rgba(74, 144, 226, 0.2)",
          transition: "all 0.2s ease",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          outline: "none",
          width: "120px",
          height: "40px",
          boxSizing: "border-box",
          opacity: loading ? 0.6 : 1
        }}
        disabled={loading}
        onFocus={(e) => {
          if (!loading) {
            e.target.style.boxShadow = "0 0 0 3px rgba(74, 144, 226, 0.3), 0 2px 4px rgba(74, 144, 226, 0.2)";
          }
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = "0 2px 4px rgba(74, 144, 226, 0.2)";
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.target.style.backgroundColor = "#357ABD";
            e.target.style.boxShadow = "0 4px 8px rgba(74, 144, 226, 0.3)";
            e.target.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#4A90E2";
          e.target.style.boxShadow = "0 2px 4px rgba(74, 144, 226, 0.2)";
          e.target.style.transform = "translateY(0)";
        }}
      >
        {loading ? "Creating..." : (
          <>
            <span style={{ 
              fontSize: "18px", 
              lineHeight: "1", 
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              marginRight: "4px"
            }}>+</span>
            <span>Create</span>
          </>
        )}
      </button>
    </form>
  );
};

export default UserForm;

