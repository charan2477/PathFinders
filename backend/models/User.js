import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  activities: {
    careerQueries: Number,
    notesCreated: Number
  }
});

export default mongoose.model("User", userSchema);
