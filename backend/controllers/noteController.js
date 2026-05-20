const Note = require("../models/Note");
const User = require("../models/User");

/* ── GET all notes for logged-in user ── */
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

/* ── ADD a note ── */
const addNote = async (req, res) => {
  const { title, content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: "Note content is required" });
  }

  try {
    const note = await Note.create({
      userId: req.user._id,
      title: title || "Untitled Note",
      content
    });

    // Increment activity counter
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { "activities.notes": 1 }
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to add note" });
  }
};

/* ── UPDATE a note ── */
const updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });
    if (!note) return res.status(404).json({ error: "Note not found" });

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
};

/* ── DELETE a note ── */
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id // Ownership check
    });
    if (!note) return res.status(404).json({ error: "Note not found" });

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};

module.exports = { getNotes, addNote, updateNote, deleteNote };
