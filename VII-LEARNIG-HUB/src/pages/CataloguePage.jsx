// 1. Import our global navigation component
import Navbar from "../components/Navbar";

// 2. The critical 'export default' keywords fix your current error
export default function CataloguePage() {
  return (
    <div>
      {/* 3. Mount the Navbar at the very top of the page */}
      <Navbar />

      {/* 4. The main content area for the catalog */}
      <div style={styles.content}>
        <h1>Course Catalog</h1>
        <p>
          Welcome to the protected learning area. Your security clearance is
          active.
        </p>
      </div>
    </div>
  );
}

// Basic structural styling
const styles = {
  content: {
    padding: "40px",
    textAlign: "center",
  },
};
