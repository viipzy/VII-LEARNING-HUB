import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../store/AuthContext";
import Navbar from "../components/Navbar";

export default function ModuleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(AuthContext);

  // 1. Data Structure: Lessons with unique videos
  const lessons = [
    {
      id: "L1",
      title: "Foundational Concepts",
      duration: "10:00",
      video: "https://www.youtube.com/embed/SqcY0GlETPk",
    },
    {
      id: "L2",
      title: "Technical Implementation",
      duration: "25:00",
      video: "https://www.youtube.com/embed/Tn6-PIqc4UM",
    },
    {
      id: "L3",
      title: "Advanced Optimization",
      duration: "15:00",
      video: "https://www.youtube.com/embed/8v_n9yU8s7s",
    },
  ];

  // 2. State: Track which lesson is currently playing and which are finished
  const [currentIdx, setCurrentIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem(`module_${id}_progress`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      `module_${id}_progress`,
      JSON.stringify(completedLessons),
    );
  }, [completedLessons, id]);

  const handleNextLesson = () => {
    const currentLessonId = lessons[currentIdx].id;

    // Mark current as finished
    if (!completedLessons.includes(currentLessonId)) {
      setCompletedLessons([...completedLessons, currentLessonId]);
    }

    // Auto-advance to next video if it exists
    if (currentIdx < lessons.length - 1) {
      setCurrentIdx(currentIdx + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert("Congratulations! You have completed the entire module.");
    }
  };

  const s = {
    page: {
      width: "100vw",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    container: {
      flex: 1,
      padding: "20px",
      maxWidth: "1400px",
      margin: "0 auto",
      width: "100%",
    },
    videoSection: {
      width: "100%",
      borderRadius: "24px",
      overflow: "hidden",
      backgroundColor: "#000",
      aspectRatio: "16/9",
      boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
      border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0",
    },
    header: { marginTop: "30px", marginBottom: "40px" },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    },
    lessonCard: (isActive, isLocked) => ({
      padding: "24px",
      borderRadius: "20px",
      backgroundColor: isActive
        ? darkMode
          ? "#312e81"
          : "#e0e7ff"
        : darkMode
          ? "#1e293b"
          : "#fff",
      border: isActive ? "2px solid #818cf8" : "1px solid transparent",
      opacity: isLocked ? 0.5 : 1,
      cursor: isLocked ? "not-allowed" : "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    }),
    actionBtn: {
      marginTop: "20px",
      padding: "15px 30px",
      borderRadius: "12px",
      border: "none",
      backgroundColor: "#818cf8",
      color: "white",
      fontWeight: "800",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div style={s.page}>
      <Navbar />
      <div style={s.container}>
        <button
          onClick={() => navigate("/catalog")}
          style={{
            color: "#818cf8",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          ← Back
        </button>

        {/* DYNAMIC VIDEO PLAYER */}
        <div style={s.videoSection}>
          <iframe
            width="100%"
            height="100%"
            src={lessons[currentIdx].video}
            title="Lesson Player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <div style={s.header}>
          <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
            {lessons[currentIdx].title}
          </h1>
          <p style={{ color: "#94a3b8" }}>
            Lesson {currentIdx + 1} of {lessons.length}
          </p>

          <button onClick={handleNextLesson} style={s.actionBtn}>
            {currentIdx === lessons.length - 1
              ? "Finish Module"
              : "Mark Complete & Next Lesson →"}
          </button>
        </div>

        {/* CURRICULUM LIST */}
        <div style={s.grid}>
          {lessons.map((lesson, index) => {
            const isActive = currentIdx === index;
            const isLocked =
              index > 0 && !completedLessons.includes(lessons[index - 1].id);
            const isDone = completedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                style={s.lessonCard(isActive, isLocked)}
                onClick={() => !isLocked && setCurrentIdx(index)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4 style={{ color: isActive ? "#818cf8" : "inherit" }}>
                    {lesson.title}
                  </h4>
                  <span>{isDone ? "✅" : isLocked ? "🔒" : "▶️"}</span>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    marginTop: "5px",
                  }}
                >
                  {lesson.duration}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
