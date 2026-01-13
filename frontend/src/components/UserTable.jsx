import { useState, useRef } from "react";

/**
 * Table component for displaying and managing users
 */
const UserTable = ({ users, loading, onEdit, onDelete }) => {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editZip, setEditZip] = useState("");
  const nameFormRef = useRef(null);
  const zipFormRef = useRef(null);

  const startEdit = (user) => {
    setEditId(user.id);
    setEditName(user.name);
    setEditZip(user.zip_code);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditZip("");
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    
    // Check both forms' validity and show native browser validation messages
    let isValid = true;
    
    if (nameFormRef.current && !nameFormRef.current.checkValidity()) {
      nameFormRef.current.reportValidity();
      isValid = false;
    }
    
    if (zipFormRef.current && !zipFormRef.current.checkValidity()) {
      zipFormRef.current.reportValidity();
      isValid = false;
    }
    
    if (!isValid) {
      return;
    }
    
    try {
      await onEdit(editId, { name: editName.trim(), zip_code: editZip.trim() });
      cancelEdit();
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <table width="100%" cellPadding="20" style={{ borderCollapse: "collapse", fontSize: "16px", tableLayout: "fixed" }}>
      <thead>
        <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
          <th style={{ padding: "16px", fontSize: "18px", fontWeight: "600", width: "20%" }}>Name</th>
          <th style={{ padding: "16px", fontSize: "18px", fontWeight: "600", width: "10%" }}>Zip</th>
          <th style={{ padding: "16px", fontSize: "18px", fontWeight: "600", width: "15%" }}>Lat</th>
          <th style={{ padding: "16px", fontSize: "18px", fontWeight: "600", width: "15%" }}>Lon</th>
          <th style={{ padding: "16px", fontSize: "18px", fontWeight: "600", width: "15%" }}>Timezone (sec)</th>
          <th style={{ padding: "16px", fontSize: "18px", fontWeight: "600", width: "25%" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const isEditing = editId === user.id;
          return (
            <tr 
              key={user.id} 
              style={{ 
                borderBottom: "1px solid #f0f0f0",
                backgroundColor: isEditing ? "#F0F9FF" : "transparent",
                borderLeft: isEditing ? "4px solid #4A90E2" : "4px solid transparent",
                boxShadow: isEditing ? "0 2px 8px rgba(74, 144, 226, 0.15)" : "none",
                transition: "all 0.3s ease"
              }}
            >
              {isEditing ? (
                <>
                  <td style={{ padding: "16px" }}>
                    <form ref={nameFormRef} onSubmit={handleSave} style={{ margin: 0, width: "100%" }}>
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        style={{ 
                          padding: "4px 8px", 
                          width: "100%", 
                          fontSize: "16px",
                          border: "1px solid #D1D5DB",
                          borderRadius: "4px",
                          boxSizing: "border-box",
                          height: "32px",
                          lineHeight: "24px",
                          margin: 0
                        }}
                        required
                      />
                    </form>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <form ref={zipFormRef} onSubmit={handleSave} style={{ margin: 0, width: "100%" }}>
                      <input
                        value={editZip}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 5) {
                            setEditZip(value);
                          }
                        }}
                        style={{ 
                          padding: "4px 8px", 
                          width: "100%", 
                          fontSize: "16px",
                          border: "1px solid #D1D5DB",
                          borderRadius: "4px",
                          boxSizing: "border-box",
                          height: "32px",
                          lineHeight: "24px",
                          margin: 0
                        }}
                        pattern="[0-9]{5}"
                        maxLength={5}
                        required
                        type="text"
                        inputMode="numeric"
                      />
                    </form>
                  </td>
                  <td style={{ padding: "16px", fontSize: "16px" }}>{Number(user.latitude).toFixed(4)}</td>
                  <td style={{ padding: "16px", fontSize: "16px" }}>{Number(user.longitude).toFixed(4)}</td>
                  <td style={{ padding: "16px", fontSize: "16px" }}>{user.timezone}</td>
                  <td style={{ whiteSpace: "nowrap", padding: "16px" }}>
                    <button 
                      onClick={handleSave} 
                      style={{ 
                        marginRight: 10, 
                        padding: "10px 20px", 
                        fontSize: "16px",
                        backgroundColor: "#10B981",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "500",
                        boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)",
                        transition: "all 0.2s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        outline: "none",
                        width: "110px",
                        height: "40px",
                        boxSizing: "border-box"
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.3), 0 2px 4px rgba(16, 185, 129, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(16, 185, 129, 0.2)";
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#059669";
                        e.target.style.boxShadow = "0 4px 8px rgba(16, 185, 129, 0.3)";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#10B981";
                        e.target.style.boxShadow = "0 2px 4px rgba(16, 185, 129, 0.2)";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      ✓ Save
                    </button>
                    <button 
                      onClick={cancelEdit} 
                      style={{ 
                        padding: "10px 20px", 
                        fontSize: "16px",
                        backgroundColor: "#6B7280",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "500",
                        boxShadow: "0 2px 4px rgba(107, 114, 128, 0.2)",
                        transition: "all 0.2s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        outline: "none",
                        width: "110px",
                        height: "40px",
                        boxSizing: "border-box"
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = "0 0 0 3px rgba(107, 114, 128, 0.3), 0 2px 4px rgba(107, 114, 128, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(107, 114, 128, 0.2)";
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#4B5563";
                        e.target.style.boxShadow = "0 4px 8px rgba(107, 114, 128, 0.3)";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#6B7280";
                        e.target.style.boxShadow = "0 2px 4px rgba(107, 114, 128, 0.2)";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      ✕ Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ padding: "16px", fontSize: "16px" }}>{user.name}</td>
                  <td style={{ padding: "16px", fontSize: "16px" }}>{user.zip_code}</td>
                  <td style={{ padding: "16px", fontSize: "16px" }}>{Number(user.latitude).toFixed(4)}</td>
                  <td style={{ padding: "16px", fontSize: "16px" }}>{Number(user.longitude).toFixed(4)}</td>
                  <td style={{ padding: "16px", fontSize: "16px" }}>{user.timezone}</td>
                  <td style={{ whiteSpace: "nowrap", padding: "16px" }}>
                    <button 
                      onClick={() => startEdit(user)} 
                      style={{ 
                        marginRight: 10, 
                        padding: "10px 20px", 
                        fontSize: "16px",
                        backgroundColor: "#4A90E2",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "500",
                        boxShadow: "0 2px 4px rgba(74, 144, 226, 0.2)",
                        transition: "all 0.2s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        outline: "none",
                        width: "110px",
                        height: "40px",
                        boxSizing: "border-box"
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = "0 0 0 3px rgba(74, 144, 226, 0.3), 0 2px 4px rgba(74, 144, 226, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(74, 144, 226, 0.2)";
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#357ABD";
                        e.target.style.boxShadow = "0 4px 8px rgba(74, 144, 226, 0.3)";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#4A90E2";
                        e.target.style.boxShadow = "0 2px 4px rgba(74, 144, 226, 0.2)";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${user.name}"?`)) {
                          onDelete(user.id);
                        }
                      }}
                      style={{ 
                        padding: "10px 20px", 
                        fontSize: "16px",
                        backgroundColor: "#E74C3C",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "500",
                        boxShadow: "0 2px 4px rgba(231, 76, 60, 0.2)",
                        transition: "all 0.2s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        outline: "none",
                        width: "110px",
                        height: "40px",
                        boxSizing: "border-box"
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = "0 0 0 3px rgba(231, 76, 60, 0.3), 0 2px 4px rgba(231, 76, 60, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = "0 2px 4px rgba(231, 76, 60, 0.2)";
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#C0392B";
                        e.target.style.boxShadow = "0 4px 8px rgba(231, 76, 60, 0.3)";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#E74C3C";
                        e.target.style.boxShadow = "0 2px 4px rgba(231, 76, 60, 0.2)";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          );
        })}
        {users.length === 0 && (
          <tr>
            <td colSpan="6" style={{ opacity: 0.7, textAlign: "center", padding: "40px", fontSize: "18px" }}>
              No users yet. Create one above!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;

