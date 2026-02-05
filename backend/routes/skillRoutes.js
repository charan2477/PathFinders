const express = require("express");
const router = express.Router();
const { getSkillRoadmap } = require("../controllers/skillController");

router.get("/skills/:career", getSkillRoadmap);

module.exports = router;
