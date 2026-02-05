import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import CareerGuidance from "./pages/CareerGuidance";
import SmartNotes from "./pages/SmartNotes";
import ResourcesVault from "./pages/ResourcesVault";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import SkillRoadmap from "./pages/skillRoadmap";
import CareerFlow from "./pages/CareerFlow";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Home />} />
          <Route path="/career" element={<CareerGuidance />} />
          <Route path="/notes" element={<SmartNotes />} />
          <Route path="/resume" element={<ResumeAnalyzer />} />
          <Route path="/resources" element={<ResourcesVault />} />
          <Route path="/skills" element={<SkillRoadmap />} />
          {/* ✅ ONLY ONE profile route */}
          <Route path="/career-flow" element={<CareerFlow />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;


