import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import LoginPage from "./pages/LoginPage";
import CataloguePage from "./pages/CataloguePage";
import UserProfile from "./pages/UserProfile";
import ModuleDetail from "./pages/ModuleDetail"; 
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import SignupPage from './pages/SignupPage';


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
          {}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />


          {}
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

          {}
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
