import { useState } from "react";

function ResumeAnalyzer() {
  const [career, setCareer] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const analyzePDF = async () => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("career", career);

    const res = await fetch("http://localhost:5000/api/resume/analyze-pdf", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Resume Analyzer (PDF)</h2>

        <input
          placeholder="Target Career (e.g. software developer)"
          onChange={(e) => setCareer(e.target.value)}
        />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={analyzePDF}>Analyze Resume</button>
      </div>

      {result && (
        <div className="card">
          <h3>Skills to Highlight</h3>
          <p>{result.highlight.join(", ") || "None detected"}</p>

          <h3>Skills to Improve</h3>
          <p>{result.improve.join(", ") || "None"}</p>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;
