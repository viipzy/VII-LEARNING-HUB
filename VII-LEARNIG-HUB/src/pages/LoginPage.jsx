import { useState, useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import googleIcon from "../assets/google.png";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState(""); // New state for Full Name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const { login, signup, loginWithGoogle, resetPassword } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "Processing..." });

    try {
      if (isSignup) {
        // Pass the name to our updated signup function
        await signup(email, password, name);
      } else {
        await login(email, password);
      }
      navigate("/profile"); // Redirect straight to the new Dashboard Hub
    } catch (err) {
      console.error(err);
      let errorMessage = err.message;
      if (err.code === "auth/invalid-credential")
        errorMessage = "Incorrect email or password.";
      if (err.code === "auth/email-already-in-use")
        errorMessage = "An account with this email already exists.";
      if (err.code === "auth/weak-password")
        errorMessage = "Password should be at least 6 characters.";
      setMessage({ type: "error", text: errorMessage });
    }
  };

  const handleForgot = async () => {
    if (!email) return setMessage({ type: "error", text: "Enter email first" });
    try {
      await resetPassword(email);
      setMessage({ type: "success", text: "Reset link sent to your email!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const s = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#020617",
    },
    card: {
      background: "#0f172a",
      padding: "40px",
      borderRadius: "24px",
      width: "100%",
      maxWidth: "400px",
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    },
    input: {
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      background: "#1e293b",
      border: "1px solid #334155",
      color: "#fff",
      marginBottom: "15px",
      outline: "none",
    },
    primaryBtn: {
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      background: "#6366f1",
      color: "#fff",
      fontWeight: "700",
      border: "none",
      cursor: "pointer",
      marginBottom: "15px",
    },
    googleBtn: {
      width: "100%",
      padding: "12px",
      borderRadius: "12px",
      background: "transparent",
      border: "1px solid #334155",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
    },
  };

  return (
    <div style={s.container}>
      <div style={s.card}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontWeight: "800",
            color: "#fff",
          }}
        >
          VEE.
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          {isSignup ? "Start your journey" : "Welcome back, Frontier"}
        </p>

        {message.text && (
          <p
            style={{
              color: message.type === "error" ? "#ef4444" : "#10b981",
              fontSize: "13px",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {}
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              style={s.input}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            style={s.input}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (Min 6 chars)"
            style={s.input}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={s.primaryBtn}>
            {isSignup ? "Create Account" : "Sign In"}
          </button>
        </form>

        {!isSignup && (
          <button
            onClick={handleForgot}
            style={{
              background: "none",
              border: "none",
              color: "#6366f1",
              fontSize: "12px",
              cursor: "pointer",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            Forgot Password?
          </button>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px 0",
            color: "#334155",
          }}
        >
          <hr style={{ flex: 1, border: "0.5px solid #334155" }} />{" "}
          <span style={{ padding: "0 10px", fontSize: "12px" }}>OR</span>{" "}
          <hr style={{ flex: 1, border: "0.5px solid #334155" }} />
        </div>

        <button type="button" onClick={loginWithGoogle} style={s.googleBtn}>
          <img
            src={googleIcon} // Use the imported variable, not a string path
            width="18"
            alt="Google"
            style={{ marginRight: "10px" }}
          />{" "}
          Continue with Google
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setIsSignup(!isSignup)}
            style={{
              color: "#6366f1",
              cursor: "pointer",
              marginLeft: "5px",
              fontWeight: "600",
            }}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
