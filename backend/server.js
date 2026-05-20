require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes     = require("./routes/authRoutes");
const noteRoutes     = require("./routes/noteRoutes");
const careerRoutes   = require("./routes/careerRoutes");
const resumeRoutes   = require("./routes/resumeRoutes");
const skillRoutes    = require("./routes/skillRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const jobRoutes      = require("./routes/jobRoutes");

const app = express();

// Connect to MongoDB Atlas (non-blocking — server stays up even if DB is down)
connectDB().catch(err => {
  console.error("⚠️  Backend running WITHOUT database. Auth/data features will fail.");
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth",      authRoutes);
app.use("/api/notes",     noteRoutes);
app.use("/api",           careerRoutes);
app.use("/api/resume",    resumeRoutes);
app.use("/api/skills",    skillRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/jobs",      jobRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ status: "OK", message: "PathFinders API running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
