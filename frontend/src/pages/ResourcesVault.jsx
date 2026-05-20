import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaFolderOpen, FaPlus, FaTrash, FaExternalLinkAlt, FaSearch } from "react-icons/fa";

function ResourcesVault() {
  const { token } = useAuth();
  const [resources, setResources] = useState([]);
  const [search, setSearch]       = useState("");
  const [showForm, setShowForm]   = useState(false);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [roadmap, setRoadmap]     = useState([]);
  const [form, setForm] = useState({ title: "", description: "", url: "", tags: "" });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };

  const fetchResources = async () => {
    try {
      const res  = await fetch("http://localhost:5000/api/resources", { headers });
      const data = await res.json();
      setResources(Array.isArray(data) ? data : []);
    } catch { setResources([]); }
    finally   { setLoading(false); }
  };

  const fetchRoadmap = async () => {
    try {
      const res  = await fetch("http://localhost:5000/api/auth/me", { headers });
      const data = await res.json();
      if (res.ok && data.skillRoadmap) setRoadmap(data.skillRoadmap);
    } catch { setRoadmap([]); }
  };

  const addResource = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("http://localhost:5000/api/resources", {
        method: "POST", headers,
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setForm({ title: "", description: "", url: "", tags: "" });
        setShowForm(false);
        fetchResources();
      }
    } finally { setSaving(false); }
  };

  const deleteResource = async (id) => {
    await fetch(`http://localhost:5000/api/resources/${id}`, { method: "DELETE", headers });
    fetchResources();
  };

  useEffect(() => { 
    fetchResources(); 
    fetchRoadmap();
  }, []);

  const filtered = resources.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.tags?.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaFolderOpen className="page-icon" /> Resources Vault</h1>
        <p>Save and organise your best learning resources — persisted in MongoDB</p>
      </div>

      {/* Controls */}
      <div className="resource-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            placeholder="Search by title or tag..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> Add Resource
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card slide-in">
          <h3>📎 Add New Resource</h3>
          <form onSubmit={addResource}>
            <div className="form-group">
              <input
                placeholder="Title *"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                rows="3"
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="URL (e.g. https://coursera.org)"
                value={form.url}
                onChange={e => setForm({ ...form, url: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Tags (comma separated: React, JavaScript)"
                value={form.tags}
                onChange={e => setForm({ ...form, tags: e.target.value })}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Saving..." : "Save Resource"}
              </button>
              <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* AI Roadmap Section */}
      {roadmap.length > 0 && (
        <div className="card roadmap-section slide-in" style={{ backgroundColor: "#f0f7ff", borderLeft: "5px solid #2563eb" }}>
          <h3>✨ AI Learning Roadmap</h3>
          <p className="subtitle">Your step-by-step guide to mastering new skills</p>
          <div className="roadmap-grid">
            {roadmap.map((step, i) => (
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

      {/* Resources list */}
      {loading ? (
        <div className="loading-state">Loading resources...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <p>📂 {search ? "No resources match your search." : "No resources yet. Add your first one!"}</p>
        </div>
      ) : (
        <div className="resource-grid">
          {filtered.map(r => (
            <div className="resource-card" key={r._id}>
              <div className="resource-card-body">
                <h4>{r.title}</h4>
                {r.description && <p>{r.description}</p>}
                <div className="tag-row">
                  {r.tags?.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
                </div>
              </div>
              <div className="resource-card-footer">
                {r.url && (
                  <a href={r.url} target="_blank" rel="noreferrer" className="btn-link">
                    <FaExternalLinkAlt /> Visit
                  </a>
                )}
                <button className="btn-small btn-danger" onClick={() => deleteResource(r._id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResourcesVault;
