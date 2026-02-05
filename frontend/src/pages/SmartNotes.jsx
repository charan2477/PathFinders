import { useState } from "react";

function SmartNotes() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateNote = () => {
    if (!note.trim()) return;

    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = note;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, note]);

      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.activities.notes += 1;
        localStorage.setItem("user", JSON.stringify(user));
      }
    }

    setNote("");
  };

  const editNote = (index) => {
    setNote(notes[index]);
    setEditIndex(index);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="container">
      {/* INPUT CARD */}
      <div className="card">
        <h2>Smart Notes</h2>

        <textarea
          rows="4"
          placeholder="Write your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button onClick={addOrUpdateNote}>
          {editIndex !== null ? "Update Note" : "Save Note"}
        </button>
      </div>

      {/* NOTES LIST */}
      <div className="notes-grid">
        {notes.length === 0 && (
          <p style={{ color: "#cbd5f5" }}>No notes added yet.</p>
        )}

        {notes.map((n, i) => (
          <div className="note-card" key={i}>
            <p>{n}</p>

            <div className="note-actions">
              <button onClick={() => editNote(i)}>Edit</button>
              <button
                className="delete-btn"
                onClick={() => deleteNote(i)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SmartNotes;
