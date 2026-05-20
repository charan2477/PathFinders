import { useState } from "react";
import { FaRoute, FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";

const CAREERS = [
  "software developer",
  "web developer",
  "data scientist"
];

function SkillRoadmap() {
  const [career, setCareer] = useState(CAREERS[0]);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRoadmap = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res  = await fetch(`http://localhost:5000/api/skills/${encodeURIComponent(career)}`);
      const data = await res.json();
      setRoadmap(data);
    } catch { setRoadmap(null); }
    finally   { setLoading(false); }
  };

  const stages = roadmap
    ? [
        { label: "🌱 Beginner",     items: roadmap.beginner,     color: "#22c55e" },
        { label: "🚀 Intermediate", items: roadmap.intermediate, color: "#f97316" },
        { label: "⚡ Advanced",     items: roadmap.advanced,     color: "#3b82f6" }
      ]
    : [];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaRoute className="page-icon" /> Skill Roadmap</h1>
        <p>Follow a structured step-by-step learning path for your chosen career</p>
      </div>

      <div className="card">
        <form onSubmit={fetchRoadmap} style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Select Career</label>
            <select value={career} onChange={e => setCareer(e.target.value)}>
              {CAREERS.map(c => (
                <option key={c} value={c}>
                  {c.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Loading..." : "View Roadmap"}
          </button>
        </form>
      </div>

      {roadmap && (
        <div className="roadmap-container slide-in">
          {stages.map((stage, si) => (
            <div className="roadmap-stage" key={si} style={{ borderLeftColor: stage.color }}>
              <h3 style={{ color: stage.color }}>{stage.label}</h3>
              <div className="roadmap-items">
                {stage.items?.map((item, i) => (
                  <div key={i} className="roadmap-item">
                    <FaCheckCircle style={{ color: stage.color }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {roadmap.resources?.length > 0 && (
            <div className="card">
              <h3>📚 Recommended Resources</h3>
              <div className="resources-links">
                {roadmap.resources.map((r, i) => (
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

export default SkillRoadmap;
