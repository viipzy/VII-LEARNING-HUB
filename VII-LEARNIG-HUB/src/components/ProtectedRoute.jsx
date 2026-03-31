import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

export default function ProtectedRoute({ children }) {
  // If you added a 'loading' state to your AuthContext earlier, bring it in here
  const { user } = useContext(AuthContext);

  // If there is no user, redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user exists, allow entry
  return children;
}
