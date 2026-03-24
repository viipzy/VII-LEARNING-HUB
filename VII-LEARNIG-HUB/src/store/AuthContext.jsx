import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, darkMode, toggleTheme }}
    >
      <div
        style={{
          backgroundColor: darkMode ? "#020617" : "#f8fafc",
          color: darkMode ? "#f1f5f9" : "#0f172a",
          minHeight: "100vh",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {children}
      </div>
    </AuthContext.Provider>
  );
};
