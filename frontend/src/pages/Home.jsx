import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaCompass, FaStickyNote, FaFolder, FaFileAlt,
  FaRoute, FaBriefcase, FaArrowRight
} from "react-icons/fa";

const features = [
  { icon: <FaCompass />,  title: "Career Guidance",    desc: "AI-powered guidance for 100+ career paths",             to: "/career",    color: "#2563eb" },
  { icon: <FaStickyNote />,title: "Smart Notes",       desc: "Capture and organise your learning notes",              to: "/notes",     color: "#f97316" },
  { icon: <FaRoute />,    title: "Skill Roadmap",      desc: "Step-by-step learning paths, beginner to advanced",     to: "/skills",    color: "#8b5cf6" },
  { icon: <FaFileAlt />,  title: "Resume Analyser",    desc: "Detect skill gaps and improve your resume instantly",   to: "/resume",    color: "#22c55e" },
  { icon: <FaFolder />,   title: "Resources Vault",    desc: "Save and share the best learning resources",            to: "/resources", color: "#ec4899" },
  { icon: <FaBriefcase />,title: "Jobs Explorer",      desc: "Browse tech career roles with salary insights",         to: "/jobs",      color: "#f59e0b" },
];

const stats = [
  { value: "100+", label: "Career Paths" },
  { value: "500+", label: "Learning Resources" },
  { value: "10K+", label: "Students Guided" },
  { value: "95%",  label: "Satisfaction Rate" }
];

const testimonials = [
  { text: "PathFinders helped me understand which career suits my skills. The AI guidance was clear and spot-on.", author: "Priya S.", role: "Engineering Student" },
  { text: "Smart Notes is amazing for tracking what I learn daily. Everything is organised in one place.", author: "Rahul K.", role: "Final Year Graduate" },
  { text: "The Resources Vault saved me so much time finding trusted learning platforms.", author: "Ananya M.", role: "Job Seeker" }
];

function Home() {
  const { user } = useAuth();

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🚀 AI-Powered Career Platform</div>
          <h1 className="hero-title">
            Discover Your Path.<br />
            <span className="hero-gradient">Build Your Future.</span>
          </h1>
          <p className="hero-subtitle">
            PathFinders uses AI to guide you from confusion to clarity — with roadmaps, notes, resume analysis and more.
          </p>
          <div className="hero-cta">
            <Link to="/career" className="btn-hero-primary">
              Get Career Guidance <FaArrowRight />
            </Link>
            <Link to="/skills" className="btn-hero-secondary">
              View Skill Roadmap
            </Link>
          </div>
          {user && (
            <p className="hero-welcome">Welcome back, <strong>{user.name}</strong> 👋</p>
          )}
        </div>
        <div className="hero-visual">
          <div className="hero-orb orb-1" />
          <div className="hero-orb orb-2" />
          <div className="hero-orb orb-3" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section stats-section">
        <div className="stats-row">
          {stats.map((s, i) => (
            <div className="stat-pill" key={i}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section">
        <div className="section-header">
          <h2>Everything You Need to Succeed</h2>
          <p>Six powerful tools — all in one platform</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <Link to={f.to} className="feature-card" key={i} style={{ "--card-color": f.color }}>
              <div className="feature-icon" style={{ background: f.color + "20", color: f.color }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className="feature-cta">Explore <FaArrowRight /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section how-it-works">
        <div className="section-header">
          <h2>How PathFinders Works</h2>
          <p>Three simple steps to kick-start your career</p>
        </div>
        <div className="steps-row">
          {[
            { step: "01", title: "Tell Us Your Goal", desc: "Enter your desired career and let our AI build a personalised roadmap for you." },
            { step: "02", title: "Learn & Track",     desc: "Use Smart Notes, Resources Vault and Skill Roadmaps to stay on track." },
            { step: "03", title: "Land the Role",     desc: "Analyse your resume, apply for jobs, and track your progress on your profile." }
          ].map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-number">{s.step}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-section">
        <div className="section-header">
          <h2>What Students Say</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <p>"{t.text}"</p>
              <div className="testimonial-author">
                <div className="t-avatar">{t.author.charAt(0)}</div>
                <div>
                  <strong>{t.author}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span>🧭</span> <strong>PathFinders</strong>
            <p>AI-powered career guidance for the next generation.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/career">Career Guidance</Link>
            <Link to="/notes">Smart Notes</Link>
            <Link to="/resources">Resources Vault</Link>
            <Link to="/jobs">Jobs</Link>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>support@pathfinders.com</p>
            <p>+91 98765 43210</p>
            <p>Made with ❤️ in India</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 PathFinders. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
