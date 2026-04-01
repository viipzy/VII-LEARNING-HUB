import { createContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
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
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // NEW: Client-Side Compression to bypass Firebase Storage paywall
  const uploadAvatar = (file) => {
    return new Promise((resolve, reject) => {
      if (!user) return reject("No user logged in.");

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = async () => {
          // Create a virtual canvas to resize the image
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 200; // Perfect size for avatars
          const scaleSize = MAX_WIDTH / img.width;

          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert the canvas drawing into a highly compressed text string
          const base64String = canvas.toDataURL("image/jpeg", 0.8);

          try {
            // Save the text string directly to the free Auth profile
            await updateProfile(user, { photoURL: base64String });
            setUser({ ...user, photoURL: base64String });
            resolve();
          } catch (err) {
            console.error("Profile Update Error:", err);
            reject(err);
          }
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

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
      value={{
        user,
        signup,
        login,
        loginWithGoogle,
        logout,
        resetPassword,
        uploadAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
