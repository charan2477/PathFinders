import { useState } from "react";

function SkillRoadmap() {
  const [career, setCareer] = useState("");
  const [roadmap, setRoadmap] = useState(null);

  const fetchRoadmap = async () => {
    const res = await fetch(
      `http://localhost:5000/api/skills/${career}`
    );
    const data = await res.json();
    setRoadmap(data);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Skill Development Roadmap</h2>

        <input
          placeholder="Enter career (e.g. software developer)"
          onChange={(e) => setCareer(e.target.value)}
        />

        <button onClick={fetchRoadmap}>Get Roadmap</button>
      </div>

      {roadmap && roadmap.beginner && (
        <div className="card">
          <h3>Beginner</h3>
          <ul>{roadmap.beginner.map((s, i) => <li key={i}>{s}</li>)}</ul>

          <h3>Intermediate</h3>
          <ul>{roadmap.intermediate.map((s, i) => <li key={i}>{s}</li>)}</ul>

          <h3>Advanced</h3>
          <ul>{roadmap.advanced.map((s, i) => <li key={i}>{s}</li>)}</ul>

          <h3>Resources</h3>
          {roadmap.resources.map((r, i) => (
            <p key={i}>
              <a href={r.link} target="_blank">{r.name}</a>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default SkillRoadmap;
