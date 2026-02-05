const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

const skillDatabase = {
  "software developer": ["javascript", "react", "node", "git", "dsa"],
  "data scientist": ["python", "sql", "statistics", "machine learning"],
  "web developer": ["html", "css", "javascript", "react"]
};

const analyzeResumePDF = async (req, res) => {
  try {
    const career = req.body.career;

    if (!req.file || !career) {
      return res.status(400).json({ error: "PDF and career are required" });
    }

    const loadingTask = pdfjsLib.getDocument({ data: req.file.buffer });
    const pdf = await loadingTask.promise;

    let extractedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      extractedText += strings.join(" ");
    }

    const resumeText = extractedText.toLowerCase();
    const requiredSkills = skillDatabase[career.toLowerCase()] || [];

    const foundSkills = requiredSkills.filter(skill =>
      resumeText.includes(skill)
    );

    const missingSkills = requiredSkills.filter(
      skill => !foundSkills.includes(skill)
    );

    return res.json({
      highlight: foundSkills,
      improve: missingSkills
    });

  } catch (error) {
    console.error("PDF JS Error:", error);
    return res.status(500).json({ error: "Failed to analyze resume PDF" });
  }
};

module.exports = { analyzeResumePDF };
