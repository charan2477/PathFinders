const { GoogleGenerativeAI } = require("@google/generative-ai");
const User = require("../models/User");

const getAIJobRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { careerGoal, academicBackground, aiGuidance } = user;
    const skills = aiGuidance?.skills || [];

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "AI API Key missing" });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `Based on the following user profile, recommend 5 specific job roles or opportunities they should apply for. Focus on roles available in India and globally.
    
    Goal: ${careerGoal || "Not specified"}
    Background: ${academicBackground || "Not specified"}
    Skills: ${skills.join(", ") || "Not specified"}
    
    Respond in this exact JSON format (no markdown, no extra text):
    [
      {
        "title": "Job Title",
        "company": "Example Company Type",
        "location": "Location (Remote/City)",
        "salary": "Estimated Salary Range",
        "description": "Brief description of why this fits",
        "link": "https://linkedin.com/jobs"
      }
    ]`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    const text = result?.response?.text()?.trim();
    if (!text) throw new Error("AI failed to respond");

    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    // Save recommendations to user profile
    user.aiJobs = parsed;
    await user.save();

    res.json(parsed);
  } catch (err) {
    console.error("Gemini job error:", err.message);
    res.status(500).json({ error: "AI job recommendations failed." });
  }
};

module.exports = { getAIJobRecommendations };
