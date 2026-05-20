const { GoogleGenerativeAI } = require("@google/generative-ai");
const User = require("../models/User");

/* ── Structured rule-based career data ── */
const careers = {
  "software developer": {
    path: "Learn programming fundamentals → build projects → contribute to open source → apply for roles",
    skills: ["Java", "Python", "JavaScript", "Data Structures", "Git"],
    resources: [
      { name: "FreeCodeCamp", link: "https://www.freecodecamp.org/" },
      { name: "GeeksforGeeks", link: "https://www.geeksforgeeks.org/" },
      { name: "LeetCode", link: "https://leetcode.com/" }
    ]
  },
  "data scientist": {
    path: "Learn Python & statistics → practice on datasets → study ML → deploy models",
    skills: ["Python", "SQL", "Machine Learning", "Statistics", "Pandas"],
    resources: [
      { name: "Kaggle", link: "https://www.kaggle.com/" },
      { name: "Analytics Vidhya", link: "https://www.analyticsvidhya.com/" },
      { name: "Coursera ML Course", link: "https://www.coursera.org/learn/machine-learning" }
    ]
  },
  "web developer": {
    path: "Learn HTML/CSS/JS → master a framework → build full-stack apps → deploy",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    resources: [
      { name: "MDN Web Docs", link: "https://developer.mozilla.org/" },
      { name: "The Odin Project", link: "https://www.theodinproject.com/" },
      { name: "Frontend Masters", link: "https://frontendmasters.com/" }
    ]
  },
  "cyber security analyst": {
    path: "Learn networking & Linux → study security tools → get certified (CEH/OSCP) → practice CTFs",
    skills: ["Networking", "Linux", "Ethical Hacking", "Python", "Cybersecurity Tools"],
    resources: [
      { name: "TryHackMe", link: "https://tryhackme.com/" },
      { name: "Hack The Box", link: "https://www.hackthebox.com/" },
      { name: "Cybrary", link: "https://www.cybrary.it/" }
    ]
  },
  "cloud engineer": {
    path: "Learn cloud fundamentals → get AWS/Azure certified → practice deployments → DevOps",
    skills: ["AWS", "Linux", "Docker", "Kubernetes", "Terraform"],
    resources: [
      { name: "AWS Training", link: "https://aws.amazon.com/training/" },
      { name: "A Cloud Guru", link: "https://acloudguru.com/" },
      { name: "Kubernetes Docs", link: "https://kubernetes.io/docs/" }
    ]
  },
  "ui ux designer": {
    path: "Learn design principles → master Figma → build portfolio → study user research",
    skills: ["Figma", "Design Thinking", "Prototyping", "Typography", "Color Theory"],
    resources: [
      { name: "UX Collective", link: "https://uxdesign.cc/" },
      { name: "Figma Tutorials", link: "https://www.figma.com/resources/learn-design/" },
      { name: "Nielsen Norman Group", link: "https://www.nngroup.com/" }
    ]
  },
  "mobile developer": {
    path: "Learn React Native or Flutter → build apps → publish to app stores",
    skills: ["React Native", "Flutter", "Dart", "JavaScript", "APIs"],
    resources: [
      { name: "React Native Docs", link: "https://reactnative.dev/" },
      { name: "Flutter Docs", link: "https://flutter.dev/docs" }
    ]
  },
  "devops engineer": {
    path: "Learn Linux → scripting → CI/CD → containers → cloud infrastructure",
    skills: ["Linux", "Docker", "Kubernetes", "Jenkins", "Terraform", "AWS"],
    resources: [
      { name: "DevOps Roadmap", link: "https://roadmap.sh/devops" },
      { name: "Linux Journey", link: "https://linuxjourney.com/" }
    ]
  }
};

/* ── Gemini AI call ── */
const askGemini = async (message) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `You are a career guidance expert. The user wants guidance on: "${message}".
Respond in this exact JSON format (no markdown, no extra text):
{
  "path": "a 1-2 sentence career path description",
  "skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "resources": [
    {"name": "Resource Name", "link": "https://url.com"},
    {"name": "Resource 2", "link": "https://url2.com"}
  ],
  "source": "ai"
}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    const text = result?.response?.text()?.trim();
    if (!text) return null;

    // Strip markdown code fences if present
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return { ...parsed, source: "ai" };
  } catch (err) {
    console.error("Gemini error:", err.message);
    return null;
  }
};

/* ── Main career chat handler ── */
const chat = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  const key = message.toLowerCase().trim();

  // 1. Rule-based exact match
  if (careers[key]) {
    // Increment career activity counter if user is logged in
    if (req.user) {
      User.findByIdAndUpdate(req.user._id, {
        $inc: { "activities.careers": 1 }
      }).catch(() => {});
    }
    return res.json({ ...careers[key], source: "rule-based" });
  }

  // 2. Partial match
  const partialKey = Object.keys(careers).find(k => key.includes(k) || k.includes(key));
  if (partialKey) {
    if (req.user) {
      User.findByIdAndUpdate(req.user._id, {
        $inc: { "activities.careers": 1 }
      }).catch(() => {});
    }
    return res.json({ ...careers[partialKey], source: "rule-based" });
  }

  // 3. AI fallback
  const aiResponse = await askGemini(message);
  if (aiResponse) {
    if (req.user) {
      User.findByIdAndUpdate(req.user._id, {
        $inc: { "activities.careers": 1 }
      }).catch(() => {});
    }
    return res.json(aiResponse);
  }

  // 4. Generic fallback
  return res.json({
    path: `For a career in ${message}, start with the fundamentals, build real projects, and apply consistently.`,
    skills: ["Communication", "Problem Solving", "Domain Knowledge", "Continuous Learning"],
    resources: [
      { name: "Coursera", link: "https://www.coursera.org/" },
      { name: "LinkedIn Learning", link: "https://www.linkedin.com/learning/" }
    ],
    source: "fallback"
  });
};

/* ── Detailed guidance based on user profile ── */
const getDetailedGuidance = async (req, res) => {
  const { goal, studyInfo } = req.body;
  if (!goal) return res.status(400).json({ error: "Goal is required" });

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "AI API Key missing" });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `You are a premium career guidance expert. 
    User Goal: "${goal}"
    User Background: "${studyInfo || "Not provided"}"
    
    Provide a detailed career roadmap and outcome analysis in this exact JSON format (no markdown, no extra text):
    {
      "path": "Detailed step-by-step career journey",
      "outcome": "Likely career outcome and salary expectations in India/Global",
      "skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
      "resources": [
        {"name": "Course/Book Name", "link": "url"},
        {"name": "Resource 2", "link": "url"}
      ],
      "roadmap": [
        {"step": "Step 1 Title", "description": "What to do"},
        {"step": "Step 2 Title", "description": "Next steps"}
      ]
    }`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    const text = result?.response?.text()?.trim();
    if (!text) throw new Error("AI failed to respond");

    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    // Save to user if logged in
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, {
        careerGoal: goal,
        academicBackground: studyInfo || "",
        aiGuidance: {
          path: parsed.path,
          outcome: parsed.outcome,
          skills: parsed.skills,
          resources: parsed.resources
        },
        skillRoadmap: parsed.roadmap
      });
    }

    res.json({ ...parsed, source: "ai" });
  } catch (err) {
    console.error("Gemini detailed error:", err.message);
    res.status(500).json({ error: "AI guidance failed. Please try again later." });
  }
};

module.exports = { chat, getDetailedGuidance };
