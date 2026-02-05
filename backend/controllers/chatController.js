const { smartCareerEngine } = require("./smartCareerEngine");

const careers = {
  "software developer": {
    path: "Learn programming fundamentals, build projects, apply for roles",
    skills: ["Java", "Python", "JavaScript"],
    resources: [
      { name: "FreeCodeCamp", link: "https://www.freecodecamp.org/" },
      { name: "GeeksforGeeks", link: "https://www.geeksforgeeks.org/" }
    ]
  },

  "data scientist": {
    path: "Learn Python, statistics, machine learning, and data analysis",
    skills: ["Python", "SQL", "Machine Learning"],
    resources: [
      { name: "Kaggle", link: "https://www.kaggle.com/" }
    ]
  },

  "web developer": {
    path: "Learn HTML, CSS, JavaScript, frameworks, and build websites",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    resources: [
      { name: "MDN Web Docs", link: "https://developer.mozilla.org/" }
    ]
  },

  "cyber security analyst": {
    path: "Learn networking, security basics, tools, and certifications",
    skills: ["Networking", "Linux", "Cyber Security"],
    resources: [
      { name: "TryHackMe", link: "https://tryhackme.com/" }
    ]
  },

  "cloud engineer": {
    path: "Learn cloud fundamentals, AWS/Azure, and deployment",
    skills: ["AWS", "Linux", "DevOps"],
    resources: [
      { name: "AWS Training", link: "https://aws.amazon.com/training/" }
    ]
  },

  "ui ux designer": {
    path: "Learn design principles, tools, and user experience",
    skills: ["Figma", "Design Thinking"],
    resources: [
      { name: "UX Collective", link: "https://uxdesign.cc/" }
    ]
  }
};

// OPTIONAL smart recommendation helper
const recommendCareer = (skills = []) => {
  if (skills.includes("JavaScript")) return "Web Developer";
  if (skills.includes("Python")) return "Data Scientist";
  return "Software Developer";
};

const chat = (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const key = message.toLowerCase().trim();

  // ✅ Rule-based lookup
  if (careers[key]) {
    return res.json(careers[key]);
  }

  // 🧠 Smart fallback (NO paid AI)
  const smartResponse = smartCareerEngine(key);

  return res.json(smartResponse);
};

module.exports = { chat };
