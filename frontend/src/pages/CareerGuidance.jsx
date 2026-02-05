import { useState } from "react";

function CareerGuidance() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    setResponse(data);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      user.activities.careers += 1;
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  return (
    <div className="container">
      {/* INPUT CARD */}
      <div className="card">
        <h2>Career Guidance</h2>
        <p>
          Enter a career name to get guidance on required skills, career path,
          and learning resources.
        </p>

        <input
          placeholder="Example: Software Developer, Data Scientist"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage}>Get Guidance</button>
      </div>

      {/* RESPONSE CARD */}
      {response && (
        <div className="card">
          <h3>Recommended Career Path</h3>
          <p>{response.path}</p>

          <h3>Required Skills</h3>
          <p>{response.skills.join(", ")}</p>

          <h3>Learning Resources</h3>
          {response.resources.map((r, i) => (
            <a key={i} href={r.link} target="_blank" rel="noreferrer">
              {r.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default CareerGuidance;
