import { useState, useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import SearchFilter from "../components/SearchFilter";

const DATA = [
  {
    id: 1,
    title: "Web3 Ecosystems",
    description: "Advanced blockchain and DAO governance.",
    level: "Advanced",
  },
  {
    id: 2,
    title: "UI/UX Engineering",
    description: "Premium design psychology and interfaces.",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Agro-Valorization",
    description: "Star apple peel waste-to-resource research.",
    level: "Beginner",
  },
  {
    id: 4,
    title: "Forex Mechanics",
    description: "Institutional trading and risk protocols.",
    level: "Advanced",
  },
];

export default function CataloguePage() {
  const { darkMode } = useContext(AuthContext);
  const [search, setSearch] = useState("");

  const filtered = DATA.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <Navbar />
      <main
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" }}
      >
        <header style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "900",
              letterSpacing: "-2px",
            }}
          >
            Curated <span style={{ color: "#818cf8" }}>Excellence</span>
          </h1>
          <p style={{ color: "#94a3b8" }}>
            Select your academic progression path.
          </p>
        </header>

        <SearchFilter setSearch={setSearch} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
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
