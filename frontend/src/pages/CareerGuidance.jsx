import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaCompass, FaLightbulb, FaBook, FaExternalLinkAlt, FaSpinner } from "react-icons/fa";

function CareerGuidance() {
  const { token } = useAuth();
  const [message, setMessage]   = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [deepMode, setDeepMode] = useState(false);
  const [goal, setGoal]         = useState("");
  const [studyInfo, setStudyInfo] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const endpoint = deepMode ? "http://localhost:5000/api/detailed" : "http://localhost:5000/api/chat";
      const body = deepMode ? { goal, studyInfo } : { message };

      const res  = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to get guidance");
      } else {
        setResponse(data);
      }
    } catch {
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const popularCareers = [
    "Software Developer", "Data Scientist", "Web Developer",
    "Cyber Security Analyst", "Cloud Engineer", "UI UX Designer"
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaCompass className="page-icon" /> Career Guidance</h1>
        <p>Enter any career to get a personalised roadmap, required skills and resources</p>
      </div>

      {/* Input */}
      <div className="card">
        <div className="mode-selector" style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          <button 
            className={`chip ${!deepMode ? "chip-active" : ""}`} 
            onClick={() => setDeepMode(false)}
          >
            Quick Chat
          </button>
          <button 
            className={`chip ${deepMode ? "chip-active" : ""}`} 
            onClick={() => setDeepMode(true)}
          >
            ✨ Deep AI Analysis
          </button>
        </div>

        <form onSubmit={sendMessage}>
          {!deepMode ? (
            <div className="form-group">
              <label>What career would you like guidance on?</label>
              <input
                placeholder="e.g. Software Developer, Data Scientist..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>
          ) : (
            <>
              <div className="form-group">
                <label>Target Career Goal</label>
                <input
                  placeholder="e.g. Lead UI Designer at a global startup"
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Educational Background & Skills</label>
                <textarea
                  rows="3"
                  placeholder="e.g. Bachelor's in Arts, completed course in Figma..."
                  value={studyInfo}
                  onChange={e => setStudyInfo(e.target.value)}
                />
              </div>
            </>
          )}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <><FaSpinner className="spin" /> Thinking...</> : deepMode ? "Generate Deep Guidance" : "Get Guidance"}
          </button>
        </form>

        {/* Quick picks */}
        {!deepMode && (
          <div className="quick-picks">
            <span className="picks-label">Quick pick:</span>
            {popularCareers.map(c => (
              <button
                key={c}
                type="button"
                className="chip"
                onClick={() => setMessage(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Response */}
      {response && (
        <div className="guidance-result slide-in">
          {response.source && (
            <span className={`source-badge ${response.source}`}>
              {response.source === "ai" ? "🤖 AI Generated" : response.source === "rule-based" ? "📚 Curated" : "💡 Suggested"}
            </span>
          )}

          {/* AI free-text reply */}
          {response.reply && (
            <div className="card">
              <h3><FaLightbulb /> Career Insight</h3>
              <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.7" }}>{response.reply}</p>
            </div>
          )}

          {/* Roadmap for Deep Mode */}
          {response.roadmap && (
            <div className="card roadmap-section" style={{ backgroundColor: "#f0f7ff", borderLeft: "5px solid #2563eb" }}>
              <h3>✨ Your Personal Roadmap</h3>
              <div className="roadmap-grid">
                {response.roadmap.map((step, i) => (
                  <div key={i} className="roadmap-step">
                    <div className="step-number">{i + 1}</div>
                    <div className="step-content">
                      <h4>{step.step}</h4>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Structured response */}
          {response.path && (
            <div className="card">
              <h3><FaCompass /> Career Path</h3>
              <p className="career-path-text">{response.path}</p>
            </div>
          )}

          {response.outcome && (
            <div className="card">
              <h3>💹 Career Outcome</h3>
              <p>{response.outcome}</p>
            </div>
          )}

          {response.skills?.length > 0 && (
            <div className="card">
              <h3><FaLightbulb /> Required Skills</h3>
              <div className="skills-grid">
                {response.skills.map((s, i) => (
                  <span key={i} className="skill-chip">{s}</span>
                ))}
              </div>
            </div>
          )}

          {response.resources?.length > 0 && (
            <div className="card">
              <h3><FaBook /> Learning Resources</h3>
              <div className="resources-links">
                {response.resources.map((r, i) => (
                  <a key={i} href={r.link} target="_blank" rel="noreferrer" className="resource-link">
                    <FaExternalLinkAlt /> {r.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CareerGuidance;
