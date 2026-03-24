import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

export default function LoginPage() {
  const [name, setName] = useState("");
  const { login } = useContext(AuthContext); // Connect to the database
  const navigate = useNavigate(); // Connect to the navigation system

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the page from refreshing

    if (name.trim()) {
      login({ name: name }); // Save the user name globally
      navigate("/catalog"); // Drive the user to the catalog page
    } else {
      alert("Please enter a valid identification name.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Platform Access Portal</h2>
        <p style={styles.subtitle}>
          Enter your credentials to proceed to the course repository.
        </p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Identification Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Enter Platform
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f7f6",
  },
  card: {
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
  },
  title: { margin: "0 0 10px 0", color: "#2c3e50" },
  subtitle: { color: "#7f8c8d", fontSize: "14px", marginBottom: "30px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
