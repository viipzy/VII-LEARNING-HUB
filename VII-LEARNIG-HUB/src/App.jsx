import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import our infrastructure
import { AuthProvider } from "./store/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Import our pages
import LoginPage from "./pages/LoginPage";
import CataloguePage from "./pages/CataloguePage";

function App() {
  return (
    // 1. The outermost layer is our Security Database. It covers everything.
    <AuthProvider>
      // 2. The next layer is the Router. It handles the web addresses.
      <BrowserRouter>
        <Routes>
          {}
          <Route path="/login" element={<LoginPage />} />

          {}
          <Route
            path="/catalog"
            element={
              <ProtectedRoute>
                <CataloguePage />
              </ProtectedRoute>
            }
          />

          {}
          <Route path="*" element={<Navigate to="/catalog" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
