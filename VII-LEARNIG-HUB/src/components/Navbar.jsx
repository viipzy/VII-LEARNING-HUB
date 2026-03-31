import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  // Safely extract the first letter of their name or email
  const getInitial = () => {
    if (user?.displayName) return user.displayName.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "V";
  };

  const s = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
      backgroundColor: "rgba(2, 6, 23, 0.8)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: "24px",
      fontWeight: "800",
      color: "#6366f1",
      textDecoration: "none",
    },
    links: { display: "flex", gap: "30px", alignItems: "center" },
    navItem: {
      color: "#94a3b8",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
    },
    profileContainer: { display: "flex", alignItems: "center", gap: "15px" },
    avatar: {
      width: "38px",
      height: "38px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #6366f1, #a855f7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "16px",
      border: "2px solid rgba(255,255,255,0.1)",
    },
  };

  return (
    <nav style={s.nav}>
      <Link to="/catalogue" style={s.logo}>
        VEE.
      </Link>

      <div style={s.links}>
        <Link to="/catalogue" style={s.navItem}>
          Explore
        </Link>
        <Link to="/profile" style={s.navItem}>
          Dashboard
        </Link>

        {user && (
          <div style={s.profileContainer}>
            <span style={{ fontSize: "14px", color: "#94a3b8" }}>
              Welcome,{" "}
              <strong style={{ color: "#fff" }}>
                {user.displayName?.split(" ")[0] || "Frontier"}
              </strong>{" "}
              👋
            </span>

            {/* Show Google Photo if it exists, otherwise show Initial Avatar */}
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                style={{
                  width: "38px",
                  borderRadius: "50%",
                  border: "2px solid #6366f1",
                }}
              />
            ) : (
              <div style={s.avatar}>{getInitial()}</div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
