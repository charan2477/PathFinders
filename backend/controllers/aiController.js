const smartCareerEngine = (career) => {
  return {
    path: `For ${career}, start with fundamentals, practice regularly, and follow industry trends.`,
    skills: [
      "Problem Solving",
      "Analytical Thinking",
      "Core Domain Skills",
      "Continuous Learning"
    ],
    resources: [
      {
        name: "FreeCodeCamp",
        link: "https://www.freecodecamp.org/"
      },
      {
        name: "YouTube Learning",
        link: `https://www.youtube.com/results?search_query=${career}+roadmap`
      }
    ]
  };
};

module.exports = { smartCareerEngine };
