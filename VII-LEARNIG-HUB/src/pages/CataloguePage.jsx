import { useState, useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import SearchFilter from "../components/SearchFilter";

const DATA = [
  {
    id: "web2",
    title: "Web2 Engineering",
    description: "Fullstack JS development from HTML to Node.js.",
    level: "Beginner",
  },
  {
    id: "uiux",
    title: "UI/UX Strategy",
    description: "Modern design psychology and Figma mastery.",
    level: "Intermediate",
  },
  {
    id: "web3",
    title: "Web3 & Smart Contracts",
    description: "Blockchain, Solidity, and DAO architecture.",
    level: "Advanced",
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    description: "Python, SQL, and statistical visualization.",
    level: "Intermediate",
  },
  {
    id: "forex",
    title: "Forex Mechanics",
    description: "Institutional trading and technical analysis.",
    level: "Professional",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Ethical hacking and network defense.",
    level: "Advanced",
  },
];

export default function CataloguePage() {
  const { darkMode } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");

  const filtered = DATA.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = level === "All" || c.level === level;
    return matchesSearch && matchesLevel;
  });

  const s = {
    page: {
      width: "100vw",
      minHeight: "100vh",
      backgroundColor: darkMode ? "#020617" : "#f8fafc",
      transition: "0.3s",
    },
    main: {
      width: "100%",
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "60px 20px",
    },
    hero: { textAlign: "center", marginBottom: "60px", padding: "0 10px" },
    heroTitle: {
      fontSize: "clamp(40px, 8vw, 76px)",
      fontWeight: "800", // Poppins looks elite at weight 800
      letterSpacing: "-2px",
      lineHeight: "1.1",
      marginBottom: "20px",
    },
    gradientText: {
      background: "linear-gradient(90deg, #818cf8, #c084fc)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    heroSubtitle: {
      color: "#94a3b8",
      fontSize: "clamp(16px, 2vw, 19px)",
      maxWidth: "650px",
      margin: "0 auto",
      lineHeight: "1.6",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
      gap: "25px",
      width: "100%",
    },
  };

  return (
    <div style={s.page}>
      <Navbar />
      <main style={s.main}>
        <header style={s.hero}>
          <h1 style={s.heroTitle}>
            Master the <span style={s.gradientText}>Digital Frontier</span>
          </h1>
          <p style={s.heroSubtitle}>
            Select a specialized track to begin your evolution. 60+ modules
            engineered for the next generation of builders.
          </p>
        </header>

        <SearchFilter setSearch={setSearch} setLevel={setLevel} />

        <div style={s.grid}>
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}
