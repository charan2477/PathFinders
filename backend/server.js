require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const skillRoutes = require("./routes/skillRoutes");
const careerFlowRoutes = require("./routes/careerFlowRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", resumeRoutes);
app.use("/api", chatRoutes);
app.use("/api", skillRoutes);
app.use("/api", careerFlowRoutes);


app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
