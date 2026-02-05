const { recommendCareerFromSkills } = require("./careerRecommendation");
const { smartCareerEngine } = require("./smartCareerEngine");

// simple roadmap map (reuse skill roadmap logic here)
const skillRoadmaps = {
  "software developer": ["Programming Basics", "DSA", "Backend Basics"],
  "web developer": ["HTML", "CSS", "JavaScript", "React"],
  "data scientist": ["Python", "Statistics", "Machine Learning"]
};

const analyzeFullCareerFlow = (req, res) => {
  const { extractedSkills } = req.body;

  if (!extractedSkills || extractedSkills.length === 0) {
    return res.status(400).json({ error: "No skills found" });
  }

  const career = recommendCareerFromSkills(extractedSkills);

  res.json({
    suggestedCareer: career,
    nextSteps: smartCareerEngine(career),
    roadmap: skillRoadmaps[career] || []
  });
};

module.exports = { analyzeFullCareerFlow };
