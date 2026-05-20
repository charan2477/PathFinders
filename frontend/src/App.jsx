import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CareerGuidance from "./pages/CareerGuidance";
import SmartNotes from "./pages/SmartNotes";
import ResourcesVault from "./pages/ResourcesVault";
import SkillRoadmap from "./pages/skillRoadmap";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Public */}
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected */}
            <Route path="/"         element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/career"   element={<ProtectedRoute><CareerGuidance /></ProtectedRoute>} />
            <Route path="/notes"    element={<ProtectedRoute><SmartNotes /></ProtectedRoute>} />
            <Route path="/resources"element={<ProtectedRoute><ResourcesVault /></ProtectedRoute>} />
            <Route path="/skills"   element={<ProtectedRoute><SkillRoadmap /></ProtectedRoute>} />
            <Route path="/resume"   element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
            <Route path="/jobs"     element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
            <Route path="/profile"  element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
