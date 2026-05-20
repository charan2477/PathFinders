const express = require("express");
const router = express.Router();
const { chat, getDetailedGuidance } = require("../controllers/careerController");
const protect = require("../middleware/authMiddleware");

// Optional auth — works logged in or out, but tracks activity when logged in
router.post("/chat", (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return require("../middleware/authMiddleware")(req, res, next);
  }
  next();
}, chat);

router.post("/detailed", protect, getDetailedGuidance);

module.exports = router;
