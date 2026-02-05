const express = require("express");
const multer = require("multer");
const router = express.Router();

const { analyzeResumePDF } = require("../controllers/resumeController");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/resume/analyze-pdf", upload.single("resume"), analyzeResumePDF);

module.exports = router;
