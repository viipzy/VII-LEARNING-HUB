import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { COURSE_DB } from "../data/courses";
import { useProgress } from "../hooks/useProgress";

export default function ModuleDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = COURSE_DB[courseId];

  const {
    userProgress,
    isLoadingProgress,
    enrollInCourse,
    markLessonComplete,
  } = useProgress();

  // NEW: Processing state for the Enroll button
  const [isProcessing, setIsProcessing] = useState(false);

  const [currentLesson, setCurrentLesson] = useState(() => {
    return course?.lessons && course.lessons.length > 0
      ? course.lessons[0]
      : null;
  });

  useEffect(() => {
    if (!course) navigate("/catalogue");
  }, [course, navigate]);

  if (!course) return null;

  if (!course.lessons || course.lessons.length === 0) {
    return (
      <div
        style={{
          padding: "60px",
          textAlign: "center",
          color: "#ef4444",
          background: "#020617",
          height: "100vh",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <h2>System Error: Missing Course Data</h2>
        <p>
          The lessons array for <b>{course.title}</b> is missing in your
          courses.js file.
        </p>
      </div>
    );
  }

  if (isLoadingProgress) {
    return (
      <div
        style={{
          height: "calc(100vh - 80px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#818cf8",
          fontSize: "18px",
          background: "#020617",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <span style={{ animation: "pulse 1.5s infinite" }}>
          Verifying Enrollment Status...
        </span>
      </div>
    );
  }

  const courseData = userProgress[courseId];
  const isEnrolled = courseData?.enrolled;
  const completedLessons = courseData?.completedLessons || [];
  const progressPercentage =
    Math.round((completedLessons.length / course.lessons.length) * 100) || 0;

  const s = {
    page: {
      padding: "40px",
      maxWidth: "1400px",
      margin: "0 auto",
      color: "#fff",
      display: "flex",
      gap: "30px",
      flexWrap: "wrap",
      fontFamily: "'Poppins', sans-serif",
    },
    cinema: {
      flex: "1 1 800px",
      background: "#0f172a",
      borderRadius: "24px",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    },
    videoWrapper: {
      position: "relative",
      paddingBottom: "56.25%",
      height: 0,
      backgroundColor: "#000",
    },
    iframe: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: "none",
    },
    sidebar: {
      flex: "1 1 350px",
      background: "#0f172a",
      borderRadius: "24px",
      padding: "30px",
      border: "1px solid rgba(255,255,255,0.08)",
      maxHeight: "calc(100vh - 120px)",
      overflowY: "auto",
    },
    enrollOverlay: {
      position: "absolute",
      inset: 0,
      background: "rgba(2,6,23,0.95)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
      backdropFilter: "blur(10px)",
    },

    lessonItem: (isActive, isDone, isLocked) => ({
      padding: "16px",
      borderRadius: "12px",
      marginBottom: "12px",
      cursor: isLocked || !isEnrolled ? "not-allowed" : "pointer",
      background: isActive
        ? "rgba(99, 102, 241, 0.15)"
        : "rgba(255,255,255,0.02)",
      border: `1px solid ${isActive ? "#6366f1" : "rgba(255,255,255,0.05)"}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      opacity: isLocked || !isEnrolled ? 0.4 : 1,
      transition: "all 0.2s ease",
      transform: isActive ? "scale(1.02)" : "scale(1)",
    }),
  };

  return (
    <div style={s.page}>
      <div style={s.cinema}>
        <div style={s.videoWrapper}>
          {!isEnrolled && (
            <div style={s.enrollOverlay}>
              <h2
                style={{
                  fontSize: "32px",
                  marginBottom: "15px",
                  fontWeight: "800",
                }}
              >
                Access Restricted
              </h2>
              <p
                style={{
                  color: "#94a3b8",
                  marginBottom: "30px",
                  fontSize: "16px",
                }}
              >
                Enroll in this track to unlock the curriculum.
              </p>

              {/* UPDATED ENROLL BUTTON */}
              <button
                onClick={async () => {
                  setIsProcessing(true);
                  const success = await enrollInCourse(courseId);
                  if (!success) setIsProcessing(false);
                }}
                disabled={isProcessing}
                style={{
                  padding: "14px 36px",
                  background: isProcessing
                    ? "#475569"
                    : "linear-gradient(135deg, #6366f1, #a855f7)",
                  color: isProcessing ? "#94a3b8" : "#fff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: isProcessing ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
              >
                {isProcessing ? "Authorizing Access..." : "Enroll Now"}
              </button>
            </div>
          )}
          {currentLesson && (
            <iframe
              src={currentLesson.video}
              style={s.iframe}
              allowFullScreen
              title="Video Player"
            />
          )}
        </div>

        <div style={{ padding: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "26px",
                  marginBottom: "10px",
                  fontWeight: "700",
                }}
              >
                {currentLesson?.title}
              </h2>
              <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>
                {course.description}
              </p>
            </div>

            {isEnrolled &&
              currentLesson &&
              !completedLessons.includes(currentLesson.id) && (
                <button
                  onClick={() => {
                    markLessonComplete(courseId, currentLesson.id);
                    const currentIndex = course.lessons.findIndex(
                      (l) => l.id === currentLesson.id,
                    );
                    if (currentIndex < course.lessons.length - 1) {
                      setCurrentLesson(course.lessons[currentIndex + 1]);
                    }
                  }}
                  style={{
                    padding: "12px 24px",
                    background: "#10b981",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                  }}
                >
                  Mark as Complete ✓
                </button>
              )}
          </div>
        </div>
      </div>

      <div style={s.sidebar}>
        <h3
          style={{ fontSize: "22px", marginBottom: "15px", fontWeight: "800" }}
        >
          {course.title}
        </h3>

        <div style={{ marginBottom: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              color: "#94a3b8",
              marginBottom: "10px",
              fontWeight: "600",
            }}
          >
            <span>Track Progress</span>
            <span style={{ color: "#fff" }}>{progressPercentage}%</span>
          </div>
          <div
            style={{
              width: "100%",
              height: "8px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercentage}%`,
                height: "100%",
                background: "linear-gradient(90deg, #818cf8, #c084fc)",
                transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {course.lessons?.map((lesson, index) => {
            const isDone = completedLessons.includes(lesson.id);
            const isActive = currentLesson?.id === lesson.id;

            const isUnlocked =
              index === 0 ||
              completedLessons.includes(course.lessons[index - 1].id);
            const isLocked = !isUnlocked;

            return (
              <div
                key={lesson.id}
                style={s.lessonItem(isActive, isDone, isLocked)}
                onClick={() => {
                  if (isEnrolled && !isLocked) setCurrentLesson(lesson);
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: isActive ? "700" : "500",
                  }}
                >
                  {lesson.title}
                </span>

                <div>
                  {isDone && (
                    <span style={{ color: "#10b981", fontSize: "16px" }}>
                      ✔
                    </span>
                  )}
                  {isLocked && !isDone && (
                    <span style={{ color: "#64748b", fontSize: "14px" }}>
                      🔒
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            `}</style>
    </div>
  );
}
