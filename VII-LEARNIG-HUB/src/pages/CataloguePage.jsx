import { useState, useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import SearchFilter from "../components/SearchFilter";

// Ensure the "export default" keywords are exactly like this:
export default function CataloguePage() {
  const { darkMode } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");

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

  const filtered = DATA.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = level === "All" || c.level === level;
    return matchesSearch && matchesLevel;
  });

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#020617" : "#f8fafc",
      }}
    >
      <Navbar />
      <main
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 20px" }}
      >
        <header style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: "900",
              letterSpacing: "-2px",
            }}
          >
            Academic <span style={{ color: "#818cf8" }}>Repository</span>
          </h1>
        </header>

        <SearchFilter setSearch={setSearch} setLevel={setLevel} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "30px",
          }}
        >
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}

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
