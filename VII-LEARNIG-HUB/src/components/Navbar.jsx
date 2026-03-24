import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

export default function Navbar() {
  const { user, logout, darkMode, toggleTheme } = useContext(AuthContext);

  const s = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 60px",
      borderBottom: darkMode ? "1px solid #1e293b" : "1px solid #e2e8f0",
      backgroundColor: darkMode
        ? "rgba(15, 23, 42, 0.8)"
        : "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    themeBtn: {
      background: "none",
      border: "none",
      fontSize: "20px",
      cursor: "pointer",
      marginRight: "20px",
    },
    logout: {
      backgroundColor: darkMode ? "#334155" : "#f1f5f9",
      color: darkMode ? "#f1f5f9" : "#0f172a",
      border: "none",
      padding: "8px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    },
  };

  return (
    <nav style={s.nav}>
      <div
        style={{
          fontWeight: "900",
          fontSize: "22px",
          color: darkMode ? "#818cf8" : "#4f46e5",
        }}
      >
        VEE.
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={toggleTheme} style={s.themeBtn}>
          {darkMode ? "☀️" : "🌙"}
        </button>
        <div style={{ marginRight: "20px", fontSize: "14px" }}>
          {user?.name}
        </div>
        <button onClick={logout} style={s.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
