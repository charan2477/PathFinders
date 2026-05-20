import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaSearch, FaMagic } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const JOBS = [
  {
    title: "Software Developer",
    company: "TechCorp India",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹8–18 LPA",
    tags: ["JavaScript", "React", "Node.js"],
    description: "Design, develop, and maintain scalable software applications.",
    career: "software developer"
  },
  {
    title: "Data Scientist",
    company: "AnalyticsHub",
    location: "Hyderabad, India",
    type: "Full-time",
    salary: "₹10–22 LPA",
    tags: ["Python", "Machine Learning", "SQL"],
    description: "Analyse large datasets and build ML models to extract business insights.",
    career: "data scientist"
  },
  {
    title: "Frontend Web Developer",
    company: "WebStudio",
    location: "Remote",
    type: "Full-time",
    salary: "₹5–12 LPA",
    tags: ["React", "CSS", "JavaScript"],
    description: "Build modern, responsive web interfaces for enterprise clients.",
    career: "web developer"
  },
  {
    title: "Cyber Security Analyst",
    company: "SecureNet",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹9–20 LPA",
    tags: ["Networking", "Linux", "Ethical Hacking"],
    description: "Protect systems and networks from cyber threats and vulnerabilities.",
    career: "cyber security analyst"
  },
  {
    title: "Cloud Engineer",
    company: "CloudSystems",
    location: "Pune, India",
    type: "Full-time",
    salary: "₹12–25 LPA",
    tags: ["AWS", "Docker", "Kubernetes"],
    description: "Manage and deploy cloud infrastructure on AWS and Azure platforms.",
    career: "cloud engineer"
  },
  {
    title: "UI/UX Designer",
    company: "Creative Labs",
    location: "Chennai, India",
    type: "Contract",
    salary: "₹6–14 LPA",
    tags: ["Figma", "Design Thinking", "Prototyping"],
    description: "Create user-friendly interfaces and engaging digital experiences.",
    career: "ui ux designer"
  },
  {
    title: "Mobile App Developer",
    company: "AppFactory",
    location: "Noida, India",
    type: "Full-time",
    salary: "₹7–15 LPA",
    tags: ["React Native", "Flutter", "APIs"],
    description: "Develop cross-platform mobile apps for iOS and Android.",
    career: "mobile developer"
  },
  {
    title: "DevOps Engineer",
    company: "InfraOps",
    location: "Gurgaon, India",
    type: "Full-time",
    salary: "₹14–28 LPA",
    tags: ["CI/CD", "Jenkins", "Terraform"],
    description: "Automate software delivery pipelines and manage cloud infrastructure.",
    career: "devops engineer"
  }
];

function Jobs() {
  const navigate    = useNavigate();
  const { token }   = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [aiJobs, setAiJobs] = useState([]);
  const [loadingAi, setLoadingAi] = useState(false);

  const fetchAiJobs = async () => {
    if (!token) return;
    setLoadingAi(true);
    try {
      const res = await fetch("http://localhost:5000/api/jobs/recommendations", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setAiJobs(data);
    } catch { /* fallback to static */ }
    finally { setLoadingAi(false); }
  };

  useEffect(() => {
    fetchAiJobs();
  }, [token]);

  const types = ["All", "Full-time", "Contract", "Remote"];

  const filtered = JOBS.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
                        j.tags.join(" ").toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || j.type === filter || j.location === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaBriefcase className="page-icon" /> Jobs & Career Roles</h1>
        <p>Explore popular tech career roles and get personalised guidance to land them</p>
      </div>

      {/* Controls */}
      <div className="job-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            placeholder="Search roles or skills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-chips">
          {types.map(t => (
            <button
              key={t}
              className={`chip ${filter === t ? "chip-active" : ""}`}
              onClick={() => setFilter(t)}
            >{t}</button>
          ))}
        </div>
      </div>

      {/* AI Recommendations Section */}
      {aiJobs.length > 0 && (
        <div className="ai-jobs-section slide-in">
          <div className="section-header">
            <h2><FaMagic style={{ color: "var(--primary)" }} /> AI Recommended for You</h2>
            <p>Tailored opportunities based on your Career Vision</p>
          </div>
          <div className="jobs-grid" style={{ marginBottom: "40px" }}>
            {aiJobs.map((job, i) => (
              <div className="job-card ai-card" key={i} style={{ border: "2px solid var(--primary-light)" }}>
                <div className="job-card-header">
                  <div>
                    <h3>{job.title}</h3>
                    <p className="job-company">{job.company}</p>
                  </div>
                  <span className="job-type-badge ai-badge">AI Match</span>
                </div>
                <div className="job-meta">
                  <span><FaMapMarkerAlt /> {job.location}</span>
                  <span><FaDollarSign /> {job.salary}</span>
                </div>
                <p className="job-description">{job.description}</p>
                <a href={job.link} target="_blank" rel="noreferrer" className="btn-primary btn-full" style={{ textAlign: "center", textDecoration: "none", display: "block" }}>
                  Apply via AI Link
                </a>
              </div>
            ))}
          </div>
          <hr style={{ margin: "40px 0", border: "0", borderTop: "1px solid #eee" }} />
          <h2>All Available Roles</h2>
        </div>
      )}

      {/* Job grid */}
      <div className="jobs-grid">
        {filtered.map((job, i) => (
          <div className="job-card" key={i}>
            <div className="job-card-header">
              <div>
                <h3>{job.title}</h3>
                <p className="job-company">{job.company}</p>
              </div>
              <span className={`job-type-badge ${job.type === "Contract" ? "contract" : "fulltime"}`}>
                {job.type}
              </span>
            </div>

            <div className="job-meta">
              <span><FaMapMarkerAlt /> {job.location}</span>
              <span><FaDollarSign /> {job.salary}</span>
            </div>

            <p className="job-description">{job.description}</p>

            <div className="tag-row">
              {job.tags.map((tag, ti) => <span key={ti} className="tag">{tag}</span>)}
            </div>

            <button
              className="btn-primary btn-full"
              onClick={() => navigate(`/career?q=${encodeURIComponent(job.career)}`)}
            >
              Get Career Guidance
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
