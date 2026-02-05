import { useNavigate } from "react-router-dom";

function Jobs() {
  const navigate = useNavigate();

  const jobs = [
    {
      title: "Software Developer",
      description: "Design, develop, and maintain software applications."
    },
    {
      title: "Web Developer",
      description: "Build and maintain websites and web applications."
    },
    {
      title: "Data Scientist",
      description: "Analyze data and build models to extract insights."
    },
    {
      title: "Cyber Security Analyst",
      description: "Protect systems and networks from cyber threats."
    },
    {
      title: "Cloud Engineer",
      description: "Manage and deploy applications on cloud platforms."
    },
    {
      title: "UI/UX Designer",
      description: "Design user-friendly interfaces and experiences."
    }
  ];

  return (
    <div className="container">
      <div className="card">
        <h2>Jobs & Career Roles</h2>
        <p>Explore popular career roles and get guidance</p>
      </div>

      <div className="jobs-grid">
        {jobs.map((job, index) => (
          <div className="job-card" key={index}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>

            <button onClick={() => navigate("/career")}>
              Get Guidance
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
