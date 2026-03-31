import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import LoginPage from "./pages/LoginPage";
import CataloguePage from "./pages/CataloguePage";
import UserProfile from "./pages/UserProfile";
import ModuleDetail from "./pages/ModuleDetail"; // 1. IMPORT THE NEW PAGE
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/catalogue"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <CataloguePage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <UserProfile />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* 2. ADD THE MISSING ROUTE HERE */}
          <Route
            path="/module/:courseId"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ModuleDetail />
                </AppLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
