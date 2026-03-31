import { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../store/AuthContext";

export function useProgress() {
  const { user } = useContext(AuthContext);
  const [userProgress, setUserProgress] = useState({});
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoadingProgress(false);
      return;
    }

    let isDataResolved = false;
    const userRef = doc(db, "users", user.uid);

    // Circuit Breaker: Force UI render after 3 seconds of network delay
    const networkTimeout = setTimeout(() => {
      if (!isDataResolved) {
        console.warn("Network latency detected. Bypassing progress lock.");
        setIsLoadingProgress(false);
      }
    }, 3000);

    // Establish real-time listener to Firestore
    const unsubscribe = onSnapshot(
      userRef,
      (docSnap) => {
        isDataResolved = true;

        if (docSnap.exists()) {
          setUserProgress(docSnap.data().courses || {});
        } else {
          setDoc(userRef, { courses: {} }, { merge: true }).catch((err) =>
            console.error("Initialization write failed:", err),
          );
        }

        setIsLoadingProgress(false);
      },
      (error) => {
        console.error("Firestore Permission or Network Error:", error.message);
        setIsLoadingProgress(false);
      },
    );

    return () => {
      unsubscribe();
      clearTimeout(networkTimeout);
    };
  }, [user]);

  // UPDATED: Now returns true/false and catches errors
  const enrollInCourse = async (courseId) => {
    if (!user) return false;
    const userRef = doc(db, "users", user.uid);

    try {
      await setDoc(
        userRef,
        {
          courses: {
            [courseId]: { enrolled: true, completedLessons: [] },
          },
        },
        { merge: true },
      );
      return true;
    } catch (error) {
      console.error("Enrollment Error:", error);
      alert(
        "Failed to enroll. Please check your Firestore database rules. Error: " +
          error.message,
      );
      return false;
    }
  };

  const markLessonComplete = async (courseId, lessonId) => {
    if (!user) return;
    const currentCompleted = userProgress[courseId]?.completedLessons || [];

    if (!currentCompleted.includes(lessonId)) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          courses: {
            [courseId]: { completedLessons: [...currentCompleted, lessonId] },
          },
        },
        { merge: true },
      );
    }
  };

  return {
    userProgress,
    isLoadingProgress,
    enrollInCourse,
    markLessonComplete,
  };
}
