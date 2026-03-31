import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../hooks/useProgress";
import { COURSE_DB } from "../data/courses";

export default function UserProfile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userProgress, isLoadingProgress } = useProgress();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // --- NEW: Loading State UI ---
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
          Syncing Command Center with Cloud...
        </span>
      </div>
    );
  }

  // Calculate Dynamic Statistics based on Firebase Data
  const enrolledCourses = Object.keys(userProgress || {});
  let modulesMastered = 0;
  let certificatesEarned = 0;

  enrolledCourses.forEach((courseId) => {
    const completedCount =
      userProgress[courseId]?.completedLessons?.length || 0;
    modulesMastered += completedCount;

    const courseMeta = COURSE_DB[courseId];
    const totalLessons = courseMeta?.lessons?.length || 1;

    if (completedCount > 0 && completedCount === totalLessons) {
      certificatesEarned += 1;
    }
  });

  const s = {
    page: {
      padding: "40px",
      maxWidth: "1200px",
      margin: "0 auto",
      color: "#fff",
      fontFamily: "'Poppins', sans-serif",
    },
    headerCard: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      background: "#0f172a",
      padding: "30px",
      borderRadius: "24px",
      border: "1px solid rgba(255,255,255,0.08)",
      marginBottom: "40px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    },
    pfp: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      border: "4px solid #6366f1",
      objectFit: "cover",
    },
    initialAvatar: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      border: "4px solid #6366f1",
      background: "linear-gradient(135deg, #6366f1, #a855f7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "36px",
      fontWeight: "bold",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      marginBottom: "50px",
    },
    statBox: {
      background: "#0f172a",
      padding: "25px",
      borderRadius: "20px",
      border: "1px solid rgba(255,255,255,0.08)",
      textAlign: "center",
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    },
    statNumber: {
      fontSize: "42px",
      fontWeight: "800",
      color: "#818cf8",
      margin: "10px 0 0 0",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "700",
      borderBottom: "1px solid #1e293b",
      paddingBottom: "15px",
      marginBottom: "25px",
      color: "#f8fafc",
    },
    trackGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
      gap: "25px",
    },
    trackCard: {
      background: "#0f172a",
      padding: "25px",
      borderRadius: "20px",
      border: "1px solid rgba(255,255,255,0.08)",
      cursor: "pointer",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    emptyState: {
      padding: "50px",
      background: "#0f172a",
      borderRadius: "20px",
      border: "1px dashed #334155",
      textAlign: "center",
      color: "#94a3b8",
      gridColumn: "1 / -1",
    },
  };

  if (!user) return null;

  const getInitial = () =>
    user.displayName ? user.displayName.charAt(0).toUpperCase() : "V";

  return (
    <div style={s.page}>
      <h1
        style={{
          marginBottom: "30px",
          fontSize: "32px",
          fontWeight: "800",
          background: "linear-gradient(to right, #818cf8, #c084fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Dashboard
      </h1>

      <div style={s.headerCard}>
        {user.photoURL ? (
          <img src={user.photoURL} alt="Profile" style={s.pfp} />
        ) : (
          <div style={s.initialAvatar}>{getInitial()}</div>
        )}
        <div>
          <h2
            style={{ fontSize: "28px", margin: "0 0 5px 0", fontWeight: "700" }}
          >
            {user.displayName || "Digital Pioneer"}
          </h2>
          <p style={{ color: "#94a3b8", margin: 0, fontSize: "15px" }}>
            {user.email}
          </p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "15px",
              padding: "8px 20px",
              background: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#ef4444")}
            onMouseOut={(e) =>
              (e.target.style.background = "rgba(239, 68, 68, 0.1)")
            }
          >
            Sign Out
          </button>
        </div>
      </div>

      <div style={s.statsGrid}>
        <div style={s.statBox}>
          <p
            style={{
              color: "#94a3b8",
              margin: 0,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: "600",
            }}
          >
            Active Tracks
          </p>
          <h3 style={s.statNumber}>{enrolledCourses.length}</h3>
        </div>
        <div style={s.statBox}>
          <p
            style={{
              color: "#94a3b8",
              margin: 0,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: "600",
            }}
          >
            Modules Mastered
          </p>
          <h3 style={s.statNumber}>{modulesMastered}</h3>
        </div>
        <div style={s.statBox}>
          <p
            style={{
              color: "#94a3b8",
              margin: 0,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: "600",
            }}
          >
            Certificates Earned
          </p>
          <h3 style={s.statNumber}>{certificatesEarned}</h3>
        </div>
      </div>

      <h2 style={s.sectionTitle}>In-Progress Tracks</h2>

      <div style={s.trackGrid}>
        {enrolledCourses.length === 0 ? (
          <div style={s.emptyState}>
            <h3 style={{ color: "#fff", marginBottom: "10px" }}>
              No Active Deployments
            </h3>
            <p style={{ marginBottom: "20px" }}>
              You haven't enrolled in any specialization tracks yet.
            </p>
            <button
              onClick={() => navigate("/catalogue")}
              style={{
                padding: "12px 24px",
                background: "#6366f1",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Explore the Frontier
            </button>
          </div>
        ) : (
          enrolledCourses.map((courseId) => {
            const courseMeta = COURSE_DB[courseId];
            if (!courseMeta) return null;

            const progressData = userProgress[courseId];
            const completed = progressData.completedLessons?.length || 0;
            const total = courseMeta.lessons?.length || 1;
            const percent = Math.round((completed / total) * 100);

            return (
              <div
                key={courseId}
                onClick={() => navigate(`/module/${courseId}`)}
                style={s.trackCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={courseMeta.image}
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "12px",
                      objectFit: "cover",
                    }}
                    alt={courseMeta.title}
                  />
                  <div>
                    <h4
                      style={{
                        margin: "0 0 6px 0",
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#fff",
                      }}
                    >
                      {courseMeta.title}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#94a3b8",
                        fontWeight: "500",
                      }}
                    >
                      {completed} of {total} Modules Completed
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#cbd5e1",
                  }}
                >
                  <span>Track Progress</span>
                  <span>{percent}%</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${percent}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #818cf8, #c084fc)",
                      transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
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
