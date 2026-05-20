const skillDatabase = {
  "software developer": {
    required: ["javascript", "python", "java", "git", "data structures", "algorithms", "oop"],
    label: "Software Developer"
  },
  "data scientist": {
    required: ["python", "sql", "statistics", "machine learning", "pandas", "numpy", "tensorflow"],
    label: "Data Scientist"
  },
  "web developer": {
    required: ["html", "css", "javascript", "react", "node", "responsive", "api"],
    label: "Web Developer"
  },
  "cyber security analyst": {
    required: ["networking", "linux", "firewall", "penetration testing", "encryption", "python"],
    label: "Cyber Security Analyst"
  },
  "cloud engineer": {
    required: ["aws", "docker", "kubernetes", "linux", "terraform", "devops", "ci/cd"],
    label: "Cloud Engineer"
  },
  "ui ux designer": {
    required: ["figma", "adobe xd", "wireframe", "prototype", "user research", "design thinking"],
    label: "UI/UX Designer"
  }
};

const analyzeResume = async (req, res) => {
  try {
    const { career, resumeText } = req.body;

    if (!resumeText || !career) {
      return res.status(400).json({ error: "Resume text and career are required" });
    }

    const careerKey = career.toLowerCase().trim();
    const careerData = skillDatabase[careerKey];

    if (!careerData) {
      return res.status(400).json({
        error: "Unknown career. Choose from: " + Object.keys(skillDatabase).join(", ")
      });
    }

    const text = resumeText.toLowerCase();
    const required = careerData.required;

    const foundSkills = required.filter(skill => text.includes(skill));
    const missingSkills = required.filter(skill => !foundSkills.includes(skill));

    const score = Math.round((foundSkills.length / required.length) * 100);

    // Track resume activity
    if (req.user) {
      const User = require("../models/User");
      User.findByIdAndUpdate(req.user._id, {
        $inc: { "activities.resumes": 1 }
      }).catch(() => {});
    }

    return res.json({
      career: careerData.label,
      score,
      foundSkills,
      missingSkills,
      message:
        score >= 70
          ? "Great match! Your resume aligns well with this career."
          : score >= 40
          ? "Moderate match. Work on the missing skills to strengthen your profile."
          : "Low match. Consider upskilling in the areas listed below."
    });
  } catch (error) {
    console.error("Resume error:", error.message);
    return res.status(500).json({ error: "Failed to analyze resume" });
  }
};

module.exports = { analyzeResume };
