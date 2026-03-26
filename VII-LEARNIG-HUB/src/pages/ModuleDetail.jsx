import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../store/AuthContext";
import { COURSE_DB } from "../data/courses";
import Navbar from "../components/Navbar";

export default function ModuleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(AuthContext);

  const courseData = COURSE_DB[id] || COURSE_DB["web2"];
  const lessons = courseData.lessons;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem(`prog_${id}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(`prog_${id}`, JSON.stringify(completedLessons));
  }, [completedLessons, id]);

  const handleNext = () => {
    const currentId = lessons[currentIdx].id;
    if (!completedLessons.includes(currentId)) {
      setCompletedLessons([...completedLessons, currentId]);
    }
    if (currentIdx < lessons.length - 1) {
      setCurrentIdx(currentIdx + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const s = {
    page: {
      width: "100vw",
      minHeight: "100vh",
      backgroundColor: darkMode ? "#020617" : "#f8fafc",
    },
    main: {
      width: "100%",
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "20px",
    },
    videoWrapper: {
      width: "100%",
      aspectRatio: "16/9",
      borderRadius: "16px",
      overflow: "hidden",
      background: "#000",
      boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    },
    contentSection: {
      marginTop: "30px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    btn: {
      padding: "16px 30px",
      borderRadius: "14px",
      background: "#6366f1",
      color: "#fff",
      border: "none",
      fontWeight: "600", // Medium-bold Poppins
      cursor: "pointer",
      fontSize: "15px",
      fontFamily: "'Poppins', sans-serif",
    },
    curriculum: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "15px",
      marginTop: "30px",
    },
    card: (active, locked) => ({
      padding: "20px",
      borderRadius: "16px",
      cursor: locked ? "not-allowed" : "pointer",
      background: active ? "#6366f1" : darkMode ? "#1e293b" : "#fff",
      opacity: locked ? 0.4 : 1,
      transition: "0.2s",
      border: active ? "none" : "1px solid rgba(255,255,255,0.05)",
    }),
  };

  return (
    <div style={s.page}>
      <Navbar />
      <main style={s.main}>
        <button
          onClick={() => navigate("/catalog")}
          style={{
            color: "#818cf8",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          ← Return to Frontier
        </button>

        <div style={s.videoWrapper}>
          <iframe
            width="100%"
            height="100%"
            src={lessons[currentIdx].video}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <div style={s.contentSection}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "clamp(22px, 4vw, 32px)",
                  fontWeight: "900",
                }}
              >
                {lessons[currentIdx].title}
              </h1>
              <p style={{ color: "#94a3b8" }}>
                Part {currentIdx + 1} of 10 • {courseData.title}
              </p>
            </div>
            <button onClick={handleNext} style={s.btn}>
              {currentIdx === 9 ? "Complete Track" : "Next Lesson →"}
            </button>
          </div>

          <div style={s.curriculum}>
            {lessons.map((ls, i) => {
              const locked =
                i > 0 && !completedLessons.includes(lessons[i - 1].id);
              return (
                <div
                  key={ls.id}
                  style={s.card(currentIdx === i, locked)}
                  onClick={() => !locked && setCurrentIdx(i)}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      opacity: 0.6,
                      marginBottom: "4px",
                    }}
                  >
                    MODULE {i + 1}
                  </div>
                  <div style={{ fontWeight: "700" }}>
                    {ls.title} {locked ? "🔒" : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
