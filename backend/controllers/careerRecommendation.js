const { GoogleGenerativeAI } = require("@google/generative-ai");
const OpenAI = require("openai");

const skillToCareerMap = {
  "javascript": "web developer",
  "react": "web developer",
  "node": "software developer",
  "python": "data scientist",
  "sql": "data scientist",
  "machine learning": "data scientist",
  "aws": "cloud engineer"
};

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
};

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
};

const recommendCareerFromSkills = async (skills = []) => {
  // Fallback to rule-based if no skills
  if (!skills || skills.length === 0) {
    return "software developer";
  }

  const score = {};
  skills.forEach(skill => {
    const career = skillToCareerMap[skill.toLowerCase()];
    if (career) {
      score[career] = (score[career] || 0) + 1;
    }
  });

  const topCareer = Object.keys(score).sort((a, b) => score[b] - score[a])[0] || "software developer";

  // Try AI enhancement
  try {
    const preferred = (process.env.AI_PROVIDER || "gemini").toLowerCase();
    let aiResponse = null;

    const prompt = `Based on these skills: ${skills.join(", ")}, recommend the most suitable career path. Provide a brief explanation and suggest 3 key skills to develop further. Respond in JSON format: {"career": "career name", "explanation": "brief reason", "additionalSkills": ["skill1", "skill2", "skill3"]}`;

    if (preferred === "openai") {
      const client = getOpenAIClient();
      if (client) {
        const response = await client.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 200
        });
        aiResponse = response.choices[0].message.content;
      }
    } else {
      const model = getGeminiClient();
      if (model) {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }]
        });
        aiResponse = result?.response?.text();
      }
    }

    if (aiResponse) {
      try {
        const parsed = JSON.parse(aiResponse);
        return {
          career: parsed.career || topCareer,
          explanation: parsed.explanation || "Based on your skills",
          additionalSkills: parsed.additionalSkills || [],
          source: "ai"
        };
      } catch (parseError) {
        console.error("AI response parse error:", parseError);
      }
    }
  } catch (error) {
    console.error("AI recommendation error:", error);
  }

  // Fallback to rule-based
  return {
    career: topCareer,
    explanation: "Based on skill frequency analysis",
    additionalSkills: [],
    source: "rule-based"
  };
};

module.exports = { recommendCareerFromSkills };

