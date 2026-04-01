import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { COURSE_DB } from "../data/courses";
import { useProgress } from "../hooks/useProgress";

export default function ModuleDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = COURSE_DB[courseId];

  const {
    userProgress,
    isLoadingProgress,
    enrollInCourse,
    markLessonComplete,
    saveAssessment,
    awardCertificate,
  } = useProgress();

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(
    () => course?.lessons?.[0] || null,
  );

  const [answers, setAnswers] = useState({});
  const [projectUrl, setProjectUrl] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  if (!course || isLoadingProgress)
    return <div style={{ background: "#020617", height: "100vh" }} />;

  const courseData = userProgress.courses?.[courseId] || {};
  const isEnrolled = courseData.enrolled;
  const completedLessons = courseData.completedLessons || [];

  const isLastLesson =
    course.lessons.findIndex((l) => l.id === currentLesson?.id) ===
    course.lessons.length - 1;
  const isReadyForAssessment =
    isLastLesson && completedLessons.includes(currentLesson?.id);
  const hasCertificate = !!userProgress.certificates?.[courseId];

  const handleNextLesson = () => {
    markLessonComplete(courseId, currentLesson.id);
    const nextIdx =
      course.lessons.findIndex((l) => l.id === currentLesson.id) + 1;
    if (nextIdx < course.lessons.length) {
      setCurrentLesson(course.lessons[nextIdx]);
    }
  };

  const handleSubmitAssessment = async () => {
    if (!projectUrl.includes("http"))
      return alert("Please provide a valid URL for your project.");

    let correctCount = 0;
    course.quiz.forEach((q, index) => {
      if (answers[index] === q.answer) correctCount++;
    });
    const scorePercentage = Math.round(
      (correctCount / course.quiz.length) * 100,
    );

    if (scorePercentage < 70)
      return alert(
        `You scored ${scorePercentage}%. You need 70% to pass. Please review the material and try again.`,
      );

    setIsSubmittingReview(true);
    setTimeout(async () => {
      await saveAssessment(courseId, scorePercentage, projectUrl);
      await awardCertificate(courseId);
      setIsSubmittingReview(false);
      alert(`Assessment Passed with ${scorePercentage}%! Project Approved.`);
      navigate("/profile");
    }, 2000);
  };

  return (
    <div className="module-page">
      <div className="main-player-col">
        {!isReadyForAssessment ? (
          <>
            <div className="video-wrapper">
              {!isEnrolled && (
                <div className="enroll-overlay">
                  <button
                    className="enroll-btn"
                    onClick={async () => {
                      setIsProcessing(true);
                      await enrollInCourse(courseId);
                      setIsProcessing(false);
                    }}
                  >
                    {isProcessing ? "Authorizing..." : "Enroll Now"}
                  </button>
                </div>
              )}
              <iframe src={currentLesson?.video} allowFullScreen />
            </div>
            <div className="video-info">
              <h3>{currentLesson?.title}</h3>
              {isEnrolled && !completedLessons.includes(currentLesson?.id) && (
                <button
                  className="complete-btn"
                  onClick={handleNextLesson}
                  style={{ background: isLastLesson ? "#fbbf24" : "#10b981" }}
                >
                  {isLastLesson
                    ? "Finish Track & Unlock Exam"
                    : "Mark as Complete ✓"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="assessment-room">
            <h2 style={{ color: "#fbbf24", marginBottom: "10px" }}>
              Final Assessment Room
            </h2>
            <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
              Pass the quiz (70% required) and submit your final project to
              claim your certificate.
            </p>

            {hasCertificate ? (
              <div className="success-box">
                <h2 style={{ color: "#10b981", marginBottom: "10px" }}>
                  Mastery Verified
                </h2>
                <p>Score: {courseData.quizScore}% | Project Approved</p>
                <button
                  className="view-cert-btn"
                  onClick={() => navigate("/profile")}
                >
                  View Certificate
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "40px" }}>
                  <h3 className="part-title">Part 1: Knowledge Check</h3>
                  {course.quiz?.map((q, qIndex) => (
                    <div key={qIndex} className="quiz-card">
                      <p style={{ fontWeight: "600", marginBottom: "15px" }}>
                        {qIndex + 1}. {q.question}
                      </p>
                      {q.options.map((opt, oIndex) => (
                        <label
                          key={oIndex}
                          className={`quiz-option ${answers[qIndex] === oIndex ? "selected" : ""}`}
                        >
                          <input
                            type="radio"
                            checked={answers[qIndex] === oIndex}
                            onChange={() =>
                              setAnswers({ ...answers, [qIndex]: oIndex })
                            }
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "40px" }}>
                  <h3 className="part-title">Part 2: Project Submission</h3>
                  <div className="quiz-card">
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={projectUrl}
                      onChange={(e) => setProjectUrl(e.target.value)}
                      className="project-input"
                    />
                  </div>
                </div>

                <button
                  className="submit-exam-btn"
                  onClick={handleSubmitAssessment}
                  disabled={
                    isSubmittingReview ||
                    Object.keys(answers).length < course.quiz.length ||
                    !projectUrl
                  }
                >
                  {isSubmittingReview
                    ? "Grading..."
                    : "Submit for Certification"}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="sidebar-col">
        <h3 style={{ marginBottom: "20px" }}>Curriculum</h3>
        {course.lessons.map((lesson, idx) => {
          const locked =
            idx > 0 && !completedLessons.includes(course.lessons[idx - 1].id);
          const isDone = completedLessons.includes(lesson.id);
          const isActive =
            currentLesson?.id === lesson.id && !isReadyForAssessment;
          return (
            <div
              key={lesson.id}
              onClick={() => !locked && setCurrentLesson(lesson)}
              className={`lesson-item ${isActive ? "active" : ""} ${locked ? "locked" : ""}`}
            >
              <span>{lesson.title}</span>
              <span>{locked ? "🔒" : isDone ? "✅" : ""}</span>
            </div>
          );
        })}
        <div
          className={`lesson-item assessment ${isReadyForAssessment ? "active" : ""}`}
        >
          <span>🏆 Final Assessment</span>
          <span>
            {hasCertificate ? "✅" : isReadyForAssessment ? "▶" : "🔒"}
          </span>
        </div>
      </div>

      <style>{`
                .module-page { padding: 40px; max-width: 1400px; margin: 0 auto; color: #fff; display: flex; gap: 30px; font-family: 'Poppins', sans-serif; }
                .main-player-col { flex: 1 1 800px; background: #0f172a; border-radius: 24px; overflow: hidden; border: 1px solid #1e293b; }
                .sidebar-col { flex: 1 1 350px; background: #0f172a; border-radius: 24px; padding: 30px; border: 1px solid #1e293b; align-self: flex-start; max-height: 80vh; overflow-y: auto; }
                
                .video-wrapper { position: relative; padding-bottom: 56.25%; background-color: #000; }
                .video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
                .enroll-overlay { position: absolute; inset: 0; background: rgba(2,6,23,0.95); display: flex; justify-content: center; align-items: center; z-index: 10; }
                .enroll-btn { padding: 14px 36px; background: linear-gradient(135deg, #6366f1, #a855f7); color: #fff; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; }
                .video-info { padding: 30px; display: flex; justify-content: space-between; align-items: center; }
                .complete-btn { padding: 12px 24px; color: #000; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; }
                
                .lesson-item { padding: 15px; border-radius: 10px; margin-bottom: 10px; background: transparent; border: 1px solid #334155; display: flex; justify-content: space-between; cursor: pointer; }
                .lesson-item.active { background: #1e293b; border-color: #6366f1; }
                .lesson-item.locked { opacity: 0.4; cursor: not-allowed; }
                .lesson-item.assessment.active { background: rgba(251, 191, 36, 0.1); border-color: #fbbf24; color: #fbbf24; }

                .assessment-room { padding: 40px; }
                .success-box { background: rgba(16, 185, 129, 0.1); padding: 30px; border-radius: 15px; border: 1px solid #10b981; text-align: center; }
                .view-cert-btn { padding: 12px 24px; background: #10b981; color: #fff; border: none; border-radius: 10px; margin-top: 20px; cursor: pointer; }
                .part-title { border-bottom: 1px solid #334155; padding-bottom: 10px; margin-bottom: 20px; }
                .quiz-card { background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 20px; }
                .quiz-option { display: block; margin-bottom: 10px; cursor: pointer; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; border: 1px solid transparent; }
                .quiz-option.selected { 
                background: rgba(99, 102, 241, 0.2); border-color: #6366f1; }
                .quiz-option input { margin-right: 10px; }
                .project-input { 
                width: 100%; 
                padding: 15px; 
                border-radius: 8px; 
                border: 1px solid #334155; 
                background: #0f172a; color: #fff; font-size: 16px; 
                box-sizing: border-box; }
                .submit-exam-btn { width: 100%; padding: 18px; background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #000; border: none; border-radius: 12px; font-size: 18px; font-weight: 800; cursor: pointer; }
                .submit-exam-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                /* MOBILE RESPONSIVENESS */
                @media (max-width: 768px) {
                    .module-page { flex-direction: column; padding: 15px; }
                    .main-player-col, .sidebar-col { flex: 1 1 100%; width: 100%; }
                    .video-info { flex-direction: column; gap: 15px; text-align: center; padding: 20px; }
                    .complete-btn { width: 100%; }
                    .assessment-room { padding: 20px; }
                }
            `}</style>
    </div>
  );
}
