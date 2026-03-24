import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ModuleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, you would fetch this from a database using the ID
  const moduleInfo = {
    title: "Advanced Module Content",
    lessons: [
      { title: "Fundamental Overview", duration: "12:00" },
      { title: "Technical Implementation", duration: "45:00" },
      { title: "Critical Analysis & Testing", duration: "30:00" },
    ],
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />
      <div style={styles.container}>
        <button onClick={() => navigate("/catalog")} style={styles.backBtn}>
          ← Back to Catalogue
        </button>

        <div style={styles.layout}>
          {/* Video Player Section */}
          <div style={styles.videoBox}>
            <div style={styles.playerPlaceholder}>
              <h2 style={{ color: "white" }}>
                Course Video Player [Module {id}]
              </h2>
            </div>
            <h1 style={styles.title}>{moduleInfo.title}</h1>
          </div>

          {/* Sidebar Curriculum */}
          <div style={styles.sidebar}>
            <h3 style={styles.sidebarTitle}>Curriculum</h3>
            {moduleInfo.lessons.map((lesson, index) => (
              <div key={index} style={styles.lessonItem}>
                <span style={styles.lessonTitle}>
                  {index + 1}. {lesson.title}
                </span>
                <span style={styles.lessonTime}>{lesson.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "1280px", margin: "0 auto", padding: "40px 20px" },
  backBtn: {
    background: "none",
    border: "none",
    color: "#6366f1",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: "600",
  },
  layout: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" },
  videoBox: {
    backgroundColor: "white",
    borderRadius: "24px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  },
  playerPlaceholder: {
    height: "400px",
    backgroundColor: "#1e293b",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  title: { fontSize: "28px", color: "#0f172a" },
  sidebar: {
    backgroundColor: "white",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    height: "fit-content",
  },
  sidebarTitle: {
    marginBottom: "20px",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "10px",
  },
  lessonItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 0",
    borderBottom: "1px solid #f8fafc",
  },
  lessonTitle: { color: "#334155", fontSize: "14px", fontWeight: "500" },
  lessonTime: { color: "#94a3b8", fontSize: "12px" },
};
