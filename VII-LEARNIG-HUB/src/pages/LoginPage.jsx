import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

export default function LoginPage() {
  const [name, setName] = useState("");
  const { login, darkMode, toggleTheme } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login({ name: name });
      navigate("/catalog");
    }
  };

  const s = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    },
    // Decorative background glow
    glow: {
      position: "absolute",
      width: "500px",
      height: "500px",
      background:
        "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%)",
      top: "-100px",
      left: "-100px",
      zIndex: 0,
    },
    card: {
      width: "100%",
      maxWidth: "420px",
      padding: "50px 40px",
      zIndex: 1,
      backgroundColor: darkMode
        ? "rgba(30, 41, 59, 0.5)"
        : "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(16px)",
      borderRadius: "32px",
      border: darkMode
        ? "1px solid rgba(255,255,255,0.1)"
        : "1px solid rgba(0,0,0,0.05)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      textAlign: "center",
    },
    input: {
      width: "90%",
      padding: "16px 20px",
      borderRadius: "16px",
      marginBottom: "20px",
      border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0",
      backgroundColor: darkMode ? "#0f172a" : "#fff",
      color: darkMode ? "#fff" : "#000",
      fontSize: "16px",
      outline: "none",
      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
    },
    button: {
      width: "100%",
      padding: "16px",
      borderRadius: "16px",
      border: "none",
      background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
      color: "white",
      fontWeight: "800",
      fontSize: "16px",
      cursor: "pointer",
      transition: "transform 0.2s",
      boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)",
    },
    themeToggle: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
    },
  };

  return (
    <div style={s.container}>
      <div style={s.glow} />
      <button onClick={toggleTheme} style={s.themeToggle}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div style={s.card}>
        <div style={{ marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "900",
              margin: "0 0 10px 0",
              letterSpacing: "-1px",
            }}
          >
            VEE<span style={{ color: "#818cf8" }}>.</span>
          </h1>
          <p
            style={{
              color: darkMode ? "#94a3b8" : "#64748b",
              fontSize: "14px",
            }}
          >
            Access the elite academic app.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={s.input}
            required
          />
          <button type="submit" style={s.button}>
            Initialize Session
          </button>
        </form>
      </div>
    </div>
  );
}
