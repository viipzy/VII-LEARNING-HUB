import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Initialize from localStorage so refresh doesn't log you out
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("gida_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("gida_theme");
    return savedTheme !== null ? JSON.parse(savedTheme) : true;
  });

  // 2. Sync changes to localStorage
  useEffect(() => {
    localStorage.setItem("gida_theme", JSON.stringify(darkMode));
  }, [darkMode]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("gida_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("gida_user");
  };

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
          fontFamily: "'Poppins', sans-serif", // Explicitly reinforced
          transition: "all 0.3s ease",
        }}
      >
        {children}
      </div>
    </AuthContext.Provider>
  );
};

