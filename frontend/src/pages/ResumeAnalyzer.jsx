import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaFileAlt, FaCheckCircle, FaTimesCircle, FaChartLine } from "react-icons/fa";

const CAREERS = [
  "software developer",
  "data scientist",
  "web developer",
  "cyber security analyst",
  "cloud engineer",
  "ui ux designer"
];

function ResumeAnalyzer() {
  const { token }           = useAuth();
  const [career, setCareer] = useState(CAREERS[0]);
  const [text, setText]     = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const analyze = async (e) => {
    e.preventDefault();
    if (!text.trim()) return setError("Please paste your resume text");
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res  = await fetch("http://localhost:5000/api/resume/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ career, resumeText: text })
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Analysis failed");
      else setResult(data);
    } catch {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score) => {
    if (score >= 70) return "#22c55e";
    if (score >= 40) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaFileAlt className="page-icon" /> Resume Analyzer</h1>
        <p>Paste your resume text to instantly discover skill gaps for your target career</p>
      </div>

      <div className="card">
        <form onSubmit={analyze}>
          <div className="form-group">
            <label>Target Career</label>
            <select value={career} onChange={e => setCareer(e.target.value)}>
              {CAREERS.map(c => (
                <option key={c} value={c}>
                  {c.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Paste Your Resume Text</label>
            <textarea
              rows="10"
              placeholder="Paste your full resume content here — skills, experience, education..."
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>
          {error && <div className="alert alert-error">{error}</div>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Analysing..." : "Analyse Resume"}
          </button>
        </form>
      </div>

      {result && (
        <div className="slide-in">
          {/* Score card */}
          <div className="card score-card">
            <div className="score-ring" style={{ borderColor: scoreColor(result.score) }}>
              <span style={{ color: scoreColor(result.score) }}>{result.score}%</span>
            </div>
            <div>
              <h3><FaChartLine /> Match Score for {result.career}</h3>
              <p>{result.message}</p>
            </div>
          </div>

          {/* Found skills */}
          {result.foundSkills?.length > 0 && (
            <div className="card">
              <h3><FaCheckCircle style={{ color: "#22c55e" }} /> Skills Found in Your Resume</h3>
              <div className="skills-grid">
                {result.foundSkills.map((s, i) => (
                  <span key={i} className="skill-chip skill-found">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Missing skills */}
          {result.missingSkills?.length > 0 && (
            <div className="card">
              <h3><FaTimesCircle style={{ color: "#ef4444" }} /> Skills to Develop</h3>
              <div className="skills-grid">
                {result.missingSkills.map((s, i) => (
                  <span key={i} className="skill-chip skill-missing">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;
