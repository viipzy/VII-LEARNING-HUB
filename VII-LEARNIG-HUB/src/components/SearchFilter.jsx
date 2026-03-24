import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

export default function SearchFilter({ setSearch, setLevel }) {
  const { darkMode } = useContext(AuthContext);

  const s = {
    wrapper: {
      display: "flex",
      gap: "12px",
      justifyContent: "center",
      marginBottom: "40px",
      width: "100%",
    },
    input: {
      flex: 1,
      maxWidth: "500px",
      padding: "14px 24px",
      borderRadius: "20px",
      border: "none",
      outline: "none",
      backgroundColor: darkMode ? "#1e293b" : "#fff",
      color: darkMode ? "#fff" : "#000",
      boxShadow: darkMode ? "none" : "0 4px 12px rgba(0,0,0,0.05)",
    },
    select: {
      padding: "14px 20px",
      borderRadius: "20px",
      border: "none",
      backgroundColor: darkMode ? "#1e293b" : "#fff",
      color: darkMode ? "#94a3b8" : "#64748b",
      cursor: "pointer",
    },
  };

  return (
    <div style={s.wrapper}>
      <input
        type="text"
        placeholder="Search modules..."
        onChange={(e) => setSearch(e.target.value)}
        style={s.input}
      />
      <select onChange={(e) => setLevel(e.target.value)} style={s.select}>
        <option value="All">All Levels</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
  );
}
