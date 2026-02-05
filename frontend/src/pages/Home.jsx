import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="home-hero">
        <div className="overlay">
          <h1>PathFinders</h1>
          <p className="tagline">
            Discover your path. Build your future.
          </p>

          <div className="hero-buttons">
            <Link to="/career">
              <button>Get Career Guidance</button>
            </Link>
            <Link to="/resources">
              <button className="secondary">Explore Resources</button>
            </Link>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="container">
        <div className="stats">
          <div className="stat-card">
            <h2>100+</h2>
            <p>Career Paths</p>
          </div>
          <div className="stat-card">
            <h2>500+</h2>
            <p>Learning Resources</p>
          </div>
          <div className="stat-card">
            <h2>1000+</h2>
            <p>Students Guided</p>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="card">
          <h2>How PathFinders Works</h2>

          <ol className="steps">
            <li>
              <b>Explore Careers:</b> Get guidance based on your interests and
              skills.
            </li>
            <li>
              <b>Learn & Track:</b> Use Smart Notes and curated resources.
            </li>
            <li>
              <b>Grow:</b> Track progress through your profile activity.
            </li>
          </ol>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PathFinders</h3>
            <p>
              PathFinders is a career guidance and learning platform designed to help
              students and job seekers discover the right career path.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Career Guidance</li>
              <li>Smart Notes</li>
              <li>Resources Vault</li>
              <li>Profile</li>
            </ul>
          </div>
          {/* TESTIMONIALS SECTION */}
          <div className="container">
            <div className="card">
              <h2>User Testimonials</h2>

              <div className="testimonials">
                <div className="testimonial-card">
                  <p>
                    “PathFinders helped me understand which career suits my skills.
                    The guidance was clear and easy to follow.”
                  </p>
                  <h4>— Student</h4>
                </div>

                <div className="testimonial-card">
                  <p>
                    “Smart Notes is very useful for tracking what I learn daily.
                    Everything is organized in one place.”
                  </p>
                  <h4>— Final Year Graduate</h4>
                </div>

                <div className="testimonial-card">
                  <p>
                    “The Resources Vault saved me a lot of time by giving trusted
                    learning platforms in one place.”
                  </p>
                  <h4>— Job Seeker</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@pathfinders.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: India</p>
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
