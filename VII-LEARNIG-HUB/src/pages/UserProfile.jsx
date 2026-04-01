import { useContext, useState } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../hooks/useProgress";
import { COURSE_DB } from "../data/courses";
import html2canvas from "html2canvas";

export default function UserProfile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userProgress, isLoadingProgress } = useProgress();
  const [downloadingId, setDownloadingId] = useState(null);

  if (isLoadingProgress) {
    return (
      <div
        style={{
          height: "calc(100vh - 80px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#818cf8",
          fontSize: "18px",
          background: "#020617",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <span style={{ animation: "pulse 1.5s infinite" }}>
          Syncing Dashboard with Cloud...
        </span>
      </div>
    );
  }

  if (!user) return null;

  const safeCourses = userProgress?.courses || {};
  const safeCertificates = userProgress?.certificates || {};
  const enrolledCourses = Object.keys(safeCourses);

  let modulesMastered = 0;
  enrolledCourses.forEach((id) => {
    modulesMastered += safeCourses[id]?.completedLessons?.length || 0;
  });
  const certificatesEarned = Object.keys(safeCertificates).length;

  const getInitial = () =>
    user.displayName ? user.displayName.charAt(0).toUpperCase() : "V";

  const downloadCertificate = async (courseId, courseTitle) => {
    setDownloadingId(courseId);
    const certElement = document.getElementById(`certificate-${courseId}`);
    if (certElement) {
      try {
        const canvas = await html2canvas(certElement, {
          scale: 3,
          backgroundColor: "#0f172a",
          useCORS: true,
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `${user.displayName.replace(" ", "_")}_VEE_Certificate_${courseTitle.replace(" ", "_")}.png`;
        link.click();
      } catch (error) {
        alert("Error generating certificate.");
      }
    }
    setDownloadingId(null);
  };

  return (
    <div className="dashboard-page">
      <h1 className="dash-title">Dashboard</h1>

      <div className="header-card">
        {user.photoURL ? (
          <img src={user.photoURL} alt="Profile" className="dash-pfp" />
        ) : (
          <div className="dash-initial">{getInitial()}</div>
        )}
        <div className="dash-user-info">
          <h2>{user.displayName || "Digital Pioneer"}</h2>
          <p>{user.email}</p>
          <button
            className="signout-btn"
            onClick={async () => {
              await logout();
              navigate("/");
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <p>Active Tracks</p>
          <h3>{enrolledCourses.length}</h3>
        </div>
        <div className="stat-box">
          <p>Modules Mastered</p>
          <h3>{modulesMastered}</h3>
        </div>
        <div className="stat-box">
          <p>Certificates</p>
          <h3>{certificatesEarned}</h3>
        </div>
      </div>

      <h2 className="section-title">In-Progress Tracks</h2>
      <div className="track-grid">
        {enrolledCourses.length === 0 ? (
          <div className="empty-state">
            <h3>No Active Deployments</h3>
            <p>You haven't enrolled in any specialization tracks yet.</p>
            <button
              className="explore-btn"
              onClick={() => navigate("/catalogue")}
            >
              Explore the Frontier
            </button>
          </div>
        ) : (
          enrolledCourses.map((courseId) => {
            const courseMeta = COURSE_DB[courseId];
            if (!courseMeta) return null;

            const completed =
              safeCourses[courseId]?.completedLessons?.length || 0;
            const total = courseMeta.lessons?.length || 1;
            const percent = Math.round((completed / total) * 100);

            return (
              <div
                key={courseId}
                onClick={() => navigate(`/module/${courseId}`)}
                className="track-card"
              >
                <div className="track-card-header">
                  <img src={courseMeta.image} alt={courseMeta.title} />
                  <div>
                    <h4>{courseMeta.title}</h4>
                    <p>
                      {completed} of {total} Modules Completed
                    </p>
                  </div>
                </div>
                <div className="progress-text">
                  <span>Track Progress</span>
                  <span>{percent}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      <h2 className="section-title gold-title">Verified Credentials</h2>
      <div className="track-grid cert-grid">
        {Object.keys(safeCertificates).length === 0 ? (
          <div className="empty-state">
            <p style={{ color: "#64748b" }}>
              Complete a track, pass the quiz, and submit your project to earn
              your first certificate.
            </p>
          </div>
        ) : (
          Object.keys(safeCertificates).map((id) => {
            const cert = safeCertificates[id];
            const courseTitle = COURSE_DB[id]?.title;
            return (
              <div
                key={id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div id={`certificate-${id}`} className="cert-card">
                  <div className="cert-watermark">V</div>
                  <h4>VEE PROFESSIONAL CERTIFICATE</h4>
                  <h3>{courseTitle}</h3>
                  <p className="presented">Presented to</p>
                  <p className="cert-name">{user.displayName}</p>
                  <div className="cert-footer">
                    <div>
                      <p className="cert-label">Issue Date</p>
                      <p className="cert-val">{cert.issueDate}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p className="cert-label">Credential ID</p>
                      <p className="cert-val id">{cert.certId}</p>
                    </div>
                  </div>
                </div>
                <button
                  className="download-btn"
                  onClick={() => downloadCertificate(id, courseTitle)}
                  disabled={downloadingId === id}
                >
                  {downloadingId === id
                    ? "Generating PNG..."
                    : "⬇ Download Certificate"}
                </button>
              </div>
            );
          })
        )}
      </div>

      <style>{`
                .dashboard-page { padding: 40px; max-width: 1200px; margin: 0 auto; color: #fff; font-family: 'Poppins', sans-serif; }
                .dash-title { margin-bottom: 30px; font-size: 32px; font-weight: 800; background: linear-gradient(to right, #818cf8, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .header-card { display: flex; align-items: center; gap: 20px; background: #0f172a; padding: 30px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.08); margin-bottom: 40px; }
                .dash-pfp { width: 100px; height: 100px; border-radius: 50%; border: 4px solid #6366f1; object-fit: cover; }
                .dash-initial { width: 100px; height: 100px; border-radius: 50%; border: 4px solid #6366f1; background: linear-gradient(135deg, #6366f1, #a855f7); display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: bold; flex-shrink: 0; }
                .dash-user-info h2 { font-size: 28px; margin: 0 0 5px 0; font-weight: 700; }
                .dash-user-info p { color: #94a3b8; margin: 0; font-size: 15px; }
                .signout-btn { margin-top: 15px; padding: 8px 20px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; cursor: pointer; font-weight: 600; }
                
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 50px; }
                .stat-box { background: #0f172a; padding: 25px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); text-align: center; }
                .stat-box p { color: #94a3b8; margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
                .stat-box h3 { font-size: 42px; font-weight: 800; color: #818cf8; margin: 10px 0 0 0; }
                
                .section-title { font-size: 24px; font-weight: 700; border-bottom: 1px solid #1e293b; padding-bottom: 15px; margin-bottom: 25px; }
                .gold-title { color: #fbbf24; border-color: rgba(251, 191, 36, 0.2); }
                .track-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 25px; margin-bottom: 50px; }
                .track-card { background: #0f172a; padding: 25px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); cursor: pointer; transition: transform 0.2s; }
                .track-card:hover { transform: translateY(-5px); }
                .track-card-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
                .track-card-header img { width: 70px; height: 70px; border-radius: 12px; object-fit: cover; }
                .track-card-header h4 { margin: 0 0 6px 0; font-size: 18px; color: #fff; }
                .track-card-header p { margin: 0; font-size: 13px; color: #94a3b8; }
                .progress-text { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 12px; font-weight: 600; color: #cbd5e1; }
                .progress-bar-bg { width: 100%; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; }
                .progress-bar-fill { height: 100%; background: linear-gradient(90deg, #818cf8, #c084fc); }
                
                .empty-state { padding: 50px; background: #0f172a; border-radius: 20px; border: 1px dashed #334155; text-align: center; grid-column: 1 / -1; }
                .explore-btn { padding: 12px 24px; background: #6366f1; color: #fff; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; }
                
                .cert-card { background: linear-gradient(135deg, #1e293b, #0f172a); padding: 30px; border-radius: 20px; border: 2px solid #fbbf24; position: relative; overflow: hidden; }
                .cert-watermark { position: absolute; top: -20px; right: -10px; font-size: 100px; color: rgba(251, 191, 36, 0.05); font-weight: 900; line-height: 1; }
                .cert-card h4 { color: #fbbf24; font-size: 11px; letter-spacing: 2px; margin: 0 0 15px 0; }
                .cert-card h3 { margin: 10px 0; font-size: 22px; }
                .presented { font-size: 14px; color: #cbd5e1; margin: 20px 0 0 0; }
                .cert-name { font-size: 18px; color: #fff; margin: 5px 0; font-weight: bold; }
                .cert-footer { display: flex; justify-content: space-between; margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px; }
                .cert-label { font-size: 10px; color: #64748b; margin: 0; text-transform: uppercase; }
                .cert-val { font-size: 12px; color: #94a3b8; margin: 5px 0 0 0; }
                .cert-val.id { font-family: monospace; font-size: 11px; color: #475569; }
                .download-btn { padding: 12px; background: rgba(251, 191, 36, 0.1); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 10px; cursor: pointer; font-weight: 600; display: flex; justify-content: center; gap: 8px; }

                /* MOBILE FIXES */
                @media (max-width: 768px) {
                    .dashboard-page { padding: 20px; }
                    .header-card { flex-direction: column; text-align: center; padding: 20px; }
                    .dash-initial { width: 80px; height: 80px; font-size: 28px; }
                    .stats-grid { grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; }
                    .stat-box h3 { font-size: 32px; }
                    .track-grid { grid-template-columns: 1fr; gap: 15px; }
                    .cert-card { padding: 20px; }
                }
            `}</style>
    </div>
  );
}
