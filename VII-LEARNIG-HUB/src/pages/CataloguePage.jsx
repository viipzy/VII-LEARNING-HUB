import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COURSE_DB } from "../data/courses";

export default function CataloguePage() {
  const navigate = useNavigate();
  const courses = Object.values(COURSE_DB);
  const [hoveredCard, setHoveredCard] = useState(null); // Track which card is hovered

  const s = {
    // Page background with a subtle ambient glow
    page: {
      minHeight: "100vh",
      padding: "60px 40px",
      background: "radial-gradient(circle at 50% 0%, #1e1b4b 0%, #020617 60%)",
      color: "#fff",
      fontFamily: "'Poppins', sans-serif",
    },
    container: { maxWidth: "1200px", margin: "0 auto" },
    header: { marginBottom: "50px", textAlign: "center" },
    title: {
      fontSize: "46px",
      fontWeight: "800",
      background: "linear-gradient(to right, #818cf8, #c084fc)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "15px",
    },
    subtitle: {
      color: "#94a3b8",
      fontSize: "18px",
      maxWidth: "600px",
      margin: "0 auto",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
      gap: "40px",
    },
    // The Base Card Style
    card: {
      position: "relative",
      height: "380px", // Taller for a more cinematic feel
      borderRadius: "24px",
      overflow: "hidden",
      cursor: "pointer",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      backgroundColor: "#0f172a",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", // Bouncy, smooth transition
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    },
    imageContainer: {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      overflow: "hidden",
      zIndex: 1,
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.6s ease", // Smooth zoom effect
      display: "block", // Crucial fix to ensure images render properly
    },
    // The Glassmorphic text area
    overlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "60%",
      background:
        "linear-gradient(to top, rgba(2, 6, 23, 0.98) 15%, rgba(2, 6, 23, 0.6) 60%, transparent)",
      zIndex: 2,
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      transition: "transform 0.4s ease",
    },
    badge: {
      position: "absolute",
      top: "20px",
      right: "20px",
      padding: "8px 16px",
      borderRadius: "30px",
      fontSize: "12px",
      fontWeight: "700",
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      color: "#c084fc",
      zIndex: 3,
      textTransform: "uppercase",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(192, 132, 252, 0.3)",
    },
    actionRow: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginTop: "15px",
      color: "#818cf8",
      fontSize: "14px",
      fontWeight: "600",
      opacity: 0,
      transform: "translateY(10px)",
      transition: "all 0.3s ease",
    },
  };

  return (
    <div style={s.page}>
      <div style={s.container}>
        <div style={s.header}>
          <h1 style={s.title}>The Digital Frontier</h1>
          <p style={s.subtitle}>
            Select a high-performance specialization track to begin your
            journey. All modules are engineered for sequential mastery.
          </p>
        </div>

        <div style={s.grid}>
          {courses.map((course) => {
            const isHovered = hoveredCard === course.id;

            return (
              <div
                key={course.id}
                style={{
                  ...s.card,
                  transform: isHovered ? "translateY(-12px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? "0 25px 50px rgba(99, 102, 241, 0.15)"
                    : s.card.boxShadow,
                  borderColor: isHovered
                    ? "rgba(99, 102, 241, 0.4)"
                    : s.card.border,
                }}
                onClick={() => navigate(`/module/${course.id}`)}
                onMouseEnter={() => setHoveredCard(course.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={s.badge}>{course.level}</div>

                <div style={s.imageContainer}>
                  <img
                    src={course.image}
                    alt={course.title}
                    style={{
                      ...s.image,
                      transform: isHovered ? "scale(1.08)" : "scale(1)",
                    }}
                    onError={(e) => {
                      // Ultimate Fallback: If image fails, generate a nice geometric pattern
                      e.target.src = `https://ui-avatars.com/api/?name=${course.title.replace(" ", "+")}&background=0f172a&color=6366f1&size=800&font-size=0.1`;
                    }}
                  />
                </div>

                <div style={s.overlay}>
                  <h3
                    style={{
                      color: "#fff",
                      fontSize: "24px",
                      fontWeight: "700",
                      marginBottom: "8px",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {course.title}
                  </h3>
                  <p
                    style={{
                      color: "#cbd5e1",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      margin: 0,
                      opacity: 0.9,
                    }}
                  >
                    {course.description}
                  </p>

                  {/* Appears only on hover to guide the user */}
                  <div
                    style={{
                      ...s.actionRow,
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered
                        ? "translateY(0)"
                        : "translateY(10px)",
                    }}
                  >
                    Initiate Track <span>→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
