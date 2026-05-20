import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaStickyNote, FaCompass, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, token, logout } = useAuth();
  const navigate                = useNavigate();
  const [profile, setProfile]  = useState(null);
  const [loading, setLoading]  = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res  = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setProfile(data);
      } catch { /* use local user as fallback */ }
      finally { setLoading(false); }
    };
    fetchProfile();
  }, [token]);

  const displayUser = profile || user;
  if (!displayUser) return null;

  const handleLogout = () => { logout(); navigate("/login"); };

  const initial = displayUser.name?.charAt(0).toUpperCase() || "U";
  const memberSince = displayUser.createdAt
    ? new Date(displayUser.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "Recently";

  const stats = [
    { icon: <FaCompass />, label: "Career Queries", value: displayUser.activities?.careers ?? 0, color: "#2563eb" },
    { icon: <FaStickyNote />, label: "Smart Notes",    value: displayUser.activities?.notes   ?? 0, color: "#f97316" },
    { icon: <FaFileAlt />,   label: "Resumes Analysed",value: displayUser.activities?.resumes ?? 0, color: "#8b5cf6" }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaUser className="page-icon" /> My Profile</h1>
        <p>Your PathFinders activity and account information</p>
      </div>

      {loading ? (
        <div className="loading-state">Loading profile...</div>
      ) : (
        <>
          {/* Profile hero */}
          <div className="card profile-hero">
            <div className="profile-avatar">{initial}</div>
            <div className="profile-info">
              <h2>{displayUser.name}</h2>
              <p><FaEnvelope /> {displayUser.email}</p>
              <span className="member-badge">Member since {memberSince}</span>
            </div>
          </div>

          {/* AI Career Profile Data */}
          <div className="card slide-in">
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FaCompass style={{ color: "var(--primary)" }} /> Career Vision Data
            </h3>
            <p className="subtitle">Tell us your goals to get personalised AI guidance</p>
            
            <div className="profile-form">
              <div className="form-group">
                <label>Target Career Goal</label>
                <input 
                  placeholder="e.g. Senior Full Stack Developer at a Top Tech Firm"
                  value={profile?.careerGoal || ""}
                  onChange={(e) => setProfile({ ...profile, careerGoal: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Academic & Study Info</label>
                <textarea 
                  rows="3"
                  placeholder="e.g. B.Tech in CSE, 3rd year. Know Java and Python."
                  value={profile?.academicBackground || ""}
                  onChange={(e) => setProfile({ ...profile, academicBackground: e.target.value })}
                />
              </div>
              <button 
                className="btn-primary" 
                onClick={async () => {
                  setLoading(true);
                  try {
                    const res = await fetch("http://localhost:5000/api/detailed", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                      },
                      body: JSON.stringify({ 
                        goal: profile.careerGoal, 
                        studyInfo: profile.academicBackground 
                      })
                    });
                    const data = await res.json();
                    if (res.ok) {
                      setProfile({ ...profile, ...data, aiGuidance: data });
                      alert("AI Career Vision updated successfully!");
                    }
                  } catch (err) {
                    alert("Failed to update AI Vision.");
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
              >
                {loading ? "Generating..." : "✨ Generate AI Career Vision"}
              </button>
            </div>
          </div>

          {/* AI Guidance Results */}
          {profile?.aiGuidance?.path && (
            <div className="card slide-in" style={{ borderLeft: "5px solid var(--primary)" }}>
              <h3>🚀 AI Recommended Path</h3>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{profile.aiGuidance.path}</p>
              
              <h3 style={{ marginTop: "20px" }}>💹 Expected Outcome</h3>
              <p>{profile.aiGuidance.outcome}</p>
            </div>
          )}

          {/* Stats */}
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div className="stat-card" key={i} style={{ borderTop: `4px solid ${s.color}` }}>
                <div className="stat-icon" style={{ color: s.color }}>{s.icon}</div>
                <h3 style={{ color: s.color }}>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="card" style={{ textAlign: "center" }}>
            <button className="btn-danger" onClick={handleLogout}>
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
