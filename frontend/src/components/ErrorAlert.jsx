/**
 * Error alert component
 */
const ErrorAlert = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <div
      style={{
        padding: 12,
        marginBottom: 16,
        backgroundColor: "#fee",
        border: "1px solid #fcc",
        borderRadius: 4,
        color: "#c33",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{error}</span>
      {onDismiss && (
        <button onClick={onDismiss} style={{ marginLeft: 12, padding: "4px 8px" }}>
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;

