import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import googleIcon from "../assets/google.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // NEW: For success messages
  const [isLoading, setIsLoading] = useState(false);

  // NEW: Pull in resetPassword from our updated Context
  const { login, loginWithGoogle, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Incorrect email or password.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setMessage("");
    try {
      await loginWithGoogle();
      navigate("/profile");
    } catch (err) {
      console.error("Google Auth Error:", err);
      if (err.code === "auth/popup-closed-by-user") {
        setError("Google sign-in was cancelled.");
      } else if (
        err.code === "auth/operation-not-supported-in-this-environment"
      ) {
        setError("Google Sign-In is not enabled in Firebase Console.");
      } else {
        setError("Failed to authenticate with Google.");
      }
    }
  };

  // NEW: Handle the Forgot Password click
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      return setError(
        "Please enter your email address in the box above first.",
      );
    }

    try {
      await resetPassword(email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      console.error(err);
      setError("Failed to send reset email. Ensure your email is correct.");
    }
  };

  const s = {
    page: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#020617",
      fontFamily: "'Poppins', sans-serif",
    },
    card: {
      background: "#0f172a",
      padding: "50px 40px",
      borderRadius: "24px",
      width: "100%",
      maxWidth: "400px",
      boxSizing: "border-box",
      border: "1px solid rgba(255,255,255,0.05)",
    },
    logo: {
      textAlign: "center",
      color: "#fff",
      fontSize: "32px",
      fontWeight: "900",
      margin: "0 0 10px 0",
      letterSpacing: "-1px",
    },
    subtitle: {
      textAlign: "center",
      color: "#94a3b8",
      fontSize: "15px",
      margin: "0 0 30px 0",
    },
    error: {
      color: "#ef4444",
      background: "rgba(239, 68, 68, 0.1)",
      padding: "10px",
      borderRadius: "8px",
      textAlign: "center",
      fontSize: "14px",
      marginBottom: "20px",
      fontWeight: "600",
    },
    success: {
      color: "#10b981",
      background: "rgba(16, 185, 129, 0.1)",
      padding: "10px",
      borderRadius: "8px",
      textAlign: "center",
      fontSize: "14px",
      marginBottom: "20px",
      fontWeight: "600",
    },
    input: {
      width: "100%",
      padding: "14px",
      marginBottom: "20px",
      borderRadius: "10px",
      border: "1px solid #334155",
      background: "#020617",
      color: "#fff",
      fontSize: "15px",
      boxSizing: "border-box",
    },
    submitBtn: {
      width: "100%",
      padding: "14px",
      background: "#6366f1",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "background 0.2s",
      marginBottom: "20px",
    },
    linkBtn: {
      display: "block",
      textAlign: "center",
      color: "#6366f1",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      background: "none",
      border: "none",
      width: "100%",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      margin: "30px 0",
      color: "#475569",
      fontSize: "12px",
      fontWeight: "600",
    },
    line: { flex: 1, height: "1px", background: "#334155" },
    googleBtn: {
      width: "100%",
      padding: "14px",
      background: "transparent",
      color: "#fff",
      border: "1px solid #334155",
      borderRadius: "10px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      transition: "background 0.2s",
    },
    footerText: {
      textAlign: "center",
      color: "#94a3b8",
      fontSize: "14px",
      marginTop: "30px",
    },
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <h1 style={s.logo}>VEE.</h1>
        <p style={s.subtitle}>Welcome back, Pioneer</p>

        {error && <div style={s.error}>{error}</div>}
        {message && <div style={s.success}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={s.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={s.input}
          />
          <button type="submit" style={s.submitBtn} disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        {/* NEW: Connected the onClick handler */}
        <button style={s.linkBtn} onClick={handleForgotPassword}>
          Forgot Password?
        </button>

        <div style={s.divider}>
          <div style={s.line}></div>
          <span style={{ padding: "0 15px" }}>OR</span>
          <div style={s.line}></div>
        </div>

        <button style={s.googleBtn} onClick={handleGoogleLogin}>
          <img src={googleIcon} width="18" alt="Google" />
          Continue with Google
        </button>

        <p style={s.footerText}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#6366f1",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
