import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course }) {
  const { darkMode } = useContext(AuthContext);
  const navigate = useNavigate();

  const s = {
    card: {
      background: darkMode ? "rgba(30, 41, 59, 0.5)" : "#ffffff",
      borderRadius: "24px",
      padding: "24px",
      border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0",
      boxShadow: darkMode ? "none" : "0 10px 30px rgba(0,0,0,0.04)",
      transition: "transform 0.3s ease",
    },
    image: {
      height: "140px",
      borderRadius: "16px",
      marginBottom: "20px",
      background:"linear-gradient(45deg, #4f46e5, #9333ea)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    btn: {
      width: "100%",
      padding: "12px",
      borderRadius: "12px",
      border: "none",
      backgroundColor: darkMode ? "#818cf8" : "#4f46e5",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "15px",
    },
  };

  return (
    <div style={s.card}>
      <div style={s.image}>
        <span style={{ fontSize: "40px" }}>
        
        </span>
      </div>
      <span style={{ fontSize: "12px", color: "#818cf8", fontWeight: "bold" }}>
        {course.level}
      </span>
      <h3 style={{ margin: "10px 0", fontSize: "20px" }}>{course.title}</h3>
      <p style={{ fontSize: "14px", color: darkMode ? "#94a3b8" : "#64748b" }}>
        {course.description}
      </p>
      <button onClick={() => navigate(`/module/${course.id}`)} style={s.btn}>
        View Module
      </button>
    </div>
  );
}
