import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../store/AuthContext";
import { COURSE_DB } from "../data/courses"; // Import the database
import Navbar from "../components/Navbar";

export default function ModuleDetail() {
  const { id } = useParams(); // 'id' will be 'web2', 'uiux', etc.
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
    main: { maxWidth: "1400px", margin: "0 auto", padding: "30px 20px" },
    videoCard: {
      width: "100%",
      aspectRatio: "16/9",
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      background: "#000",
    },
    sidebar: {
      marginTop: "40px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "15px",
    },
    lessonItem: (isActive, isLocked) => ({
      padding: "20px",
      borderRadius: "16px",
      cursor: isLocked ? "not-allowed" : "pointer",
      background: isActive ? "#6366f1" : darkMode ? "#1e293b" : "#fff",
      color: isActive ? "#fff" : darkMode ? "#f1f5f9" : "#0f172a",
      opacity: isLocked ? 0.4 : 1,
      transition: "all 0.2s ease",
      border: "1px solid rgba(255,255,255,0.05)",
    }),
  };

  return (
    <div style={s.page}>
      <Navbar />
      <div style={s.main}>
        <div style={s.videoCard}>
          <iframe
            width="100%"
            height="100%"
            src={lessons[currentIdx].video}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "900" }}>
              {lessons[currentIdx].title}
            </h1>
            <p style={{ color: "#94a3b8" }}>
              {courseData.title} • Module {currentIdx + 1} of 10
            </p>
          </div>
          <button
            onClick={handleNext}
            style={{
              padding: "15px 35px",
              borderRadius: "14px",
              background: "#6366f1",
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Mark Complete & Next
          </button>
        </div>

        <div style={s.sidebar}>
          {lessons.map((lesson, index) => {
            const isLocked =
              index > 0 && !completedLessons.includes(lessons[index - 1].id);
            return (
              <div
                key={lesson.id}
                style={s.lessonItem(currentIdx === index, isLocked)}
                onClick={() => !isLocked && setCurrentIdx(index)}
              >
                <div
                  style={{
                    fontSize: "12px",
                    opacity: 0.7,
                    marginBottom: "5px",
                  }}
                >
                  LESSON {index + 1}
                </div>
                <div style={{ fontWeight: "bold" }}>
                  {lesson.title} {isLocked ? "🔒" : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
