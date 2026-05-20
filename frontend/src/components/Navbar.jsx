import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaHome, FaCompass, FaStickyNote, FaFolder,
  FaRoute, FaFileAlt, FaBriefcase, FaUser, FaBars, FaTimes
} from "react-icons/fa";

const navLinks = [
  { to: "/",         label: "Home",        icon: <FaHome /> },
  { to: "/career",   label: "Career",      icon: <FaCompass /> },
  { to: "/notes",    label: "Notes",       icon: <FaStickyNote /> },
  { to: "/resources",label: "Resources",   icon: <FaFolder /> },
  { to: "/skills",   label: "Roadmap",     icon: <FaRoute /> },
  { to: "/resume",   label: "Resume",      icon: <FaFileAlt /> },
  { to: "/jobs",     label: "Jobs",        icon: <FaBriefcase /> },
  { to: "/profile",  label: "Profile",     icon: <FaUser /> },
];

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate(isLoggedIn ? "/" : "/login")}>
        <span className="brand-icon">🧭</span>
        <span className="brand-name">PathFinders</span>
      </div>

      {/* Desktop links */}
      <div className="navbar-links">
        {!isLoggedIn ? (
          <>
            <NavLink to="/login"    className="nav-link">Login</NavLink>
            <NavLink to="/register" className="nav-link nav-link-cta">Get Started</NavLink>
          </>
        ) : (
          <>
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => `nav-link ${isActive ? "nav-active" : ""}`}
              >
                {link.icon} <span>{link.label}</span>
              </NavLink>
            ))}
            <div className="nav-user">
              <span className="nav-avatar">{user?.name?.charAt(0).toUpperCase()}</span>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
      </div>

      {/* Mobile hamburger */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {!isLoggedIn ? (
            <>
              <NavLink to="/login"    onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink>
            </>
          ) : (
            <>
              {navLinks.map(link => (
                <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={() => setMenuOpen(false)}>
                  {link.icon} {link.label}
                </NavLink>
              ))}
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
