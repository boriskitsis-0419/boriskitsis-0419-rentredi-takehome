import { useState } from "react";

/**
 * Table component for displaying and managing users
 */
const UserTable = ({ users, loading, onEdit, onDelete }) => {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editZip, setEditZip] = useState("");

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

  const handleSave = async () => {
    if (!editName.trim() || !editZip.trim()) return;
    await onEdit(editId, { name: editName.trim(), zip_code: editZip.trim() });
    cancelEdit();
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <table width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
          <th>Name</th>
          <th>Zip</th>
          <th>Lat</th>
          <th>Lon</th>
          <th>Timezone (sec)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const isEditing = editId === user.id;
          return (
            <tr key={user.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <td>
                {isEditing ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={{ padding: 6, width: "100%" }}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    value={editZip}
                    onChange={(e) => setEditZip(e.target.value)}
                    style={{ padding: 6, width: "100%" }}
                    pattern="[0-9]{5}"
                    maxLength={5}
                  />
                ) : (
                  user.zip_code
                )}
              </td>
              <td>{Number(user.latitude).toFixed(4)}</td>
              <td>{Number(user.longitude).toFixed(4)}</td>
              <td>{user.timezone}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                {isEditing ? (
                  <>
                    <button onClick={handleSave} style={{ marginRight: 8 }}>
                      Save
                    </button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(user)} style={{ marginRight: 8 }}>
                      Edit
                    </button>
                    <button onClick={() => onDelete(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
        {users.length === 0 && (
          <tr>
            <td colSpan="6" style={{ opacity: 0.7, textAlign: "center", padding: 20 }}>
              No users yet. Create one above!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;

