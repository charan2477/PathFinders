const express = require("express");
const router = express.Router();
const { getAIJobRecommendations } = require("../controllers/jobController");
const protect = require("../middleware/authMiddleware");

router.get("/recommendations", protect, getAIJobRecommendations);

module.exports = router;
