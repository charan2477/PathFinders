const User = require("../models/User");
const jwt = require("jsonwebtoken");

/* Helper: generate JWT */
const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ── REGISTER ── */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Password is hashed automatically via User model pre-save hook
    const user = await User.create({ name, email, password });

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        activities: user.activities,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error("Register error:", error.message);
    if (error.message?.includes("buffering timed out") || error.name === "MongoNetworkError") {
      return res.status(503).json({ error: "Database unreachable. Check MongoDB Atlas Network Access settings." });
    }
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
};

/* ── LOGIN ── */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        activities: user.activities,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);
    if (error.message?.includes("buffering timed out") || error.name === "MongoNetworkError") {
      return res.status(503).json({ error: "Database unreachable. Check MongoDB Atlas Network Access settings." });
    }
    res.status(500).json({ error: "Login failed. Please try again." });
  }
};

/* ── GET CURRENT USER (for Profile) ── */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

module.exports = { registerUser, loginUser, getMe };
