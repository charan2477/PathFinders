import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!user || isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [user, isLoggedIn, navigate]);

  if (!user) return null;

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="container">
      {/* PROFILE HEADER */}
      <div className="card profile-header">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>

      {/* STATS */}
      <div className="profile-stats">
        <div className="stat-box">
          <h3>{user.activities.careers}</h3>
          <p>Career Queries</p>
        </div>

        <div className="stat-box">
          <h3>{user.activities.notes}</h3>
          <p>Smart Notes</p>
        </div>
      </div>

      {/* ACTIONS */}
{/* ACTIONS */}
      <div className="card">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
