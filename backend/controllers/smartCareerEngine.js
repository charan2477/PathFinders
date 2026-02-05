const smartCareerEngine = (career) => {
  return {
    path: `For ${career}, start with core fundamentals, practice regularly, and follow industry trends.`,
    skills: [
      "Problem Solving",
      "Analytical Thinking",
      "Core Domain Knowledge",
      "Continuous Learning"
    ],
    resources: [
      {
        name: "Google Career Search",
        link: `https://www.google.com/search?q=${career}+career+path`
      },
      {
        name: "YouTube Roadmaps",
        link: `https://www.youtube.com/results?search_query=${career}+roadmap`
      }
    ]
  };
};

module.exports = { smartCareerEngine };
