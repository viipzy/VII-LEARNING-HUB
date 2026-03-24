import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import CataloguePage from "./pages/CataloguePage";
import ModuleDetail from "./pages/ModuleDetail"; // New Page

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/catalog"
            element={
              <ProtectedRoute>
                <CataloguePage />
              </ProtectedRoute>
            }
          />

          {/* Dynamic route for specific courses */}
          <Route
            path="/module/:id"
            element={
              <ProtectedRoute>
                <ModuleDetail />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
