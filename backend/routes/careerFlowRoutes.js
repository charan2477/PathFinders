const express = require("express");
const router = express.Router();
const { analyzeFullCareerFlow } = require("../controllers/careerFlowController");

router.post("/career/flow", analyzeFullCareerFlow);

module.exports = router;
