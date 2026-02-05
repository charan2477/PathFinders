const skillRoadmaps = {
  "software developer": {
    beginner: ["Programming Basics", "C / Java / Python", "Problem Solving"],
    intermediate: ["Data Structures", "OOP", "Git & GitHub"],
    advanced: ["System Design", "Backend Development", "Cloud Basics"],
    resources: [
      { name: "FreeCodeCamp", link: "https://www.freecodecamp.org/" },
      { name: "GeeksforGeeks", link: "https://www.geeksforgeeks.org/" }
    ]
  },

  "web developer": {
    beginner: ["HTML", "CSS", "JavaScript"],
    intermediate: ["React", "APIs", "Responsive Design"],
    advanced: ["Performance Optimization", "Deployment"],
    resources: [
      { name: "MDN Web Docs", link: "https://developer.mozilla.org/" },
      { name: "Frontend Masters", link: "https://frontendmasters.com/" }
    ]
  },

  "data scientist": {
    beginner: ["Python", "Statistics", "Excel"],
    intermediate: ["Pandas", "SQL", "Data Visualization"],
    advanced: ["Machine Learning", "Model Deployment"],
    resources: [
      { name: "Kaggle", link: "https://www.kaggle.com/" },
      { name: "Analytics Vidhya", link: "https://www.analyticsvidhya.com/" }
    ]
  }
};

const getSkillRoadmap = (req, res) => {
  const career = req.params.career.toLowerCase();

  if (!skillRoadmaps[career]) {
    return res.json({
      message: "No roadmap found. Please choose a valid career."
    });
  }

  return res.json(skillRoadmaps[career]);
};

module.exports = { getSkillRoadmap };
