import { createContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Diagnostic Fail-Safe: Force application to load after 5 seconds
    // This prevents infinite blank screens caused by network drops
    const connectionTimeout = setTimeout(() => {
      if (loading) {
        console.warn(
          "Firebase Auth connection timeout. Forcing application render.",
        );
        setLoading(false);
      }
    }, 5000);

    return () => {
      unsubscribe();
      clearTimeout(connectionTimeout);
    };
  }, [loading]);

  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await updateProfile(userCredential.user, { displayName: name });
    setUser({ ...userCredential.user, displayName: name });
    return userCredential.user;
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  // Visual indicator of the loading state
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#020617",
          color: "#818cf8",
          fontFamily: "sans-serif",
        }}
      >
        Authenticating Global State...
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, signup, login, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
