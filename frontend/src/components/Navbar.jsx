import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">PathFinders</h2>

      <ul className="nav-links">
        <li>
          <NavLink to="/" end className="nav-item">Home</NavLink>
        </li>
        <li>
          <NavLink to="/career" className="nav-item">Career Guidance</NavLink>
        </li>
        <li>
          <NavLink to="/jobs" className="nav-item">Jobs</NavLink>
        </li>
        <li>
          <NavLink to="/notes" className="nav-item">Smart Notes</NavLink>
        </li>
        <li>
          <NavLink to="/resources" className="nav-item">Resources Vault</NavLink>
        </li> 
        <li>
          <NavLink to="/skills" className="nav-item">Skill Roadmap</NavLink>
        </li>
            
        <li>
          <NavLink to="/resume" className="nav-item">Resume Analyzer</NavLink>
        </li>
        <li>
          <NavLink to="/career-flow" className="nav-item">Career Flow</NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="nav-item">👤 Profile</NavLink>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;
