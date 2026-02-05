const skillToCareerMap = {
  "javascript": "web developer",
  "react": "web developer",
  "node": "software developer",
  "python": "data scientist",
  "sql": "data scientist",
  "machine learning": "data scientist",
  "aws": "cloud engineer"
};

const recommendCareerFromSkills = (skills = []) => {
  const score = {};

  skills.forEach(skill => {
    const career = skillToCareerMap[skill];
    if (career) {
      score[career] = (score[career] || 0) + 1;
    }
  });

  return (
    Object.keys(score).sort((a, b) => score[b] - score[a])[0] ||
    "software developer"
  );
};

module.exports = { recommendCareerFromSkills };
