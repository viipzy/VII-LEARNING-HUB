import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>VIPZY Academy</div>
      <div style={styles.navItems}>
        <span style={styles.welcome}>
          Welcome, <strong>{user?.name || "Academic"}</strong>
        </span>
        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#2c3e50",
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  logo: {   fontSize: "20px", 
            fontWeight: "bold", 
            letterSpacing: "1px"
         },

  navItems: { 
                display: "flex", 
                alignItems: "center", 
                gap: "20px" 
            },

  welcome: { 
            fontSize: "14px" 
            },

  logoutBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
