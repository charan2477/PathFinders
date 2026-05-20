const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      default: "Untitled Note",
      trim: true
    },
    content: {
      type: String,
      required: [true, "Note content is required"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
