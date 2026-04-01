import { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../store/AuthContext";

export function useProgress() {
  const { user } = useContext(AuthContext);
  const [userProgress, setUserProgress] = useState({
    courses: {},
    certificates: {},
  });
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoadingProgress(false);
      return;
    }

    let isDataResolved = false;
    const userRef = doc(db, "users", user.uid);

    const networkTimeout = setTimeout(() => {
      if (!isDataResolved) setIsLoadingProgress(false);
    }, 3000);

    const unsubscribe = onSnapshot(
      userRef,
      (docSnap) => {
        isDataResolved = true;
        if (docSnap.exists()) {
          setUserProgress(docSnap.data() || { courses: {}, certificates: {} });
        } else {
          setDoc(userRef, { courses: {}, certificates: {} }, { merge: true });
        }
        setIsLoadingProgress(false);
      },
      (error) => {
        console.error("Firestore Error:", error.message);
        setIsLoadingProgress(false);
      },
    );

    return () => {
      unsubscribe();
      clearTimeout(networkTimeout);
    };
  }, [user]);

  const enrollInCourse = async (courseId) => {
    if (!user) return false;
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          courses: { [courseId]: { enrolled: true, completedLessons: [] } },
        },
        { merge: true },
      );
      return true;
    } catch (error) {
      alert("Enrollment Error: " + error.message);
      return false;
    }
  };

  const markLessonComplete = async (courseId, lessonId) => {
    if (!user) return;
    const currentCompleted =
      userProgress.courses?.[courseId]?.completedLessons || [];
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

  // NEW: Save Assessment Results
  const saveAssessment = async (courseId, quizScorePercentage, projectUrl) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);

    // We simulate "Project Approved" instantly for the user experience
    await setDoc(
      userRef,
      {
        courses: {
          [courseId]: {
            quizScore: quizScorePercentage,
            projectUrl: projectUrl,
            projectApproved: true,
          },
        },
      },
      { merge: true },
    );
  };

  const awardCertificate = async (courseId) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const certId = `VEE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    await setDoc(
      userRef,
      {
        certificates: {
          [courseId]: { issueDate: date, certId: certId },
        },
      },
      { merge: true },
    );
  };

  return {
    userProgress,
    isLoadingProgress,
    enrollInCourse,
    markLessonComplete,
    saveAssessment,
    awardCertificate,
  };
}
