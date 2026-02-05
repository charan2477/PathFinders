import { useState } from "react";

function CareerFlow() {
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState(null);

  const analyzeFlow = async () => {
    const res = await fetch("http://localhost:5000/api/career/flow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        extractedSkills: skills.split(",").map(s => s.trim().toLowerCase())
      })
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Career Flow Analyzer</h2>

        <textarea
          placeholder="Enter extracted skills (comma separated)"
          onChange={(e) => setSkills(e.target.value)}
        />

        <button onClick={analyzeFlow}>Analyze Career Path</button>
      </div>

      {result && (
        <div className="card">
          <h3>Suggested Career</h3>
          <p>{result.suggestedCareer}</p>

          <h3>Next Steps</h3>
          <p>{result.nextSteps.path}</p>

          <h3>Roadmap</h3>
          <pre>{JSON.stringify(result.roadmap, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CareerFlow;
