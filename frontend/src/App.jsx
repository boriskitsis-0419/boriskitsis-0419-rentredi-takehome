import { useUsers } from "./hooks/useUsers";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import ErrorAlert from "./components/ErrorAlert";
import { APP_CONFIG } from "./constants";
import "./App.css";

function App() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>{APP_CONFIG.title}</h1>
      <p style={{ opacity: 0.7 }}>
        API: <code>{APP_CONFIG.apiBase}</code>
      </p>

      <ErrorAlert error={error} />

      <UserForm onSubmit={createUser} loading={loading} />

      <UserTable
        users={users}
        loading={loading}
        onEdit={updateUser}
        onDelete={deleteUser}
      />
    </div>
  );
}

export default App;
