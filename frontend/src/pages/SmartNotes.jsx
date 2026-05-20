import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaStickyNote, FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

function SmartNotes() {
  const { token } = useAuth();
  const [notes, setNotes]       = useState([]);
  const [title, setTitle]       = useState("");
  const [content, setContent]   = useState("");
  const [editId, setEditId]     = useState(null);
  const [editTitle, setEditTitle]   = useState("");
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };

  const fetchNotes = async () => {
    try {
      const res  = await fetch("http://localhost:5000/api/notes", { headers });
      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch { setNotes([]); }
    finally   { setLoading(false); }
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSaving(true);
    try {
      const res  = await fetch("http://localhost:5000/api/notes", {
        method: "POST", headers,
        body: JSON.stringify({ title: title || "Untitled", content })
      });
      if (res.ok) { setTitle(""); setContent(""); fetchNotes(); }
    } finally { setSaving(false); }
  };

  const saveEdit = async (id) => {
    await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "PUT", headers,
      body: JSON.stringify({ title: editTitle, content: editContent })
    });
    setEditId(null);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/api/notes/${id}`, { method: "DELETE", headers });
    fetchNotes();
  };

  const startEdit = (note) => {
    setEditId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  useEffect(() => { fetchNotes(); }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><FaStickyNote className="page-icon" /> Smart Notes</h1>
        <p>Capture your learning, ideas and career goals in one place</p>
      </div>

      {/* Add Note Form */}
      <div className="card">
        <h3>✏️ New Note</h3>
        <form onSubmit={addNote}>
          <div className="form-group">
            <input
              placeholder="Note title (optional)"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              rows="4"
              placeholder="Write your note here..."
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={saving}>
            <FaPlus /> {saving ? "Saving..." : "Save Note"}
          </button>
        </form>
      </div>

      {/* Notes Grid */}
      {loading ? (
        <div className="loading-state">Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="empty-state">
          <p>📝 No notes yet. Write your first one above!</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map(note => (
            <div className="note-card" key={note._id}>
              {editId === note._id ? (
                <>
                  <input
                    className="edit-input"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className="edit-textarea"
                    rows="4"
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                  />
                  <div className="note-actions">
                    <button className="btn-small btn-success" onClick={() => saveEdit(note._id)}>
                      <FaSave /> Save
                    </button>
                    <button className="btn-small btn-ghost" onClick={() => setEditId(null)}>
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h4 className="note-title">{note.title}</h4>
                  <p className="note-content">{note.content}</p>
                  <span className="note-date">
                    {new Date(note.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <div className="note-actions">
                    <button className="btn-small btn-ghost" onClick={() => startEdit(note)}>
                      <FaEdit /> Edit
                    </button>
                    <button className="btn-small btn-danger" onClick={() => deleteNote(note._id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SmartNotes;
