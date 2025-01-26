import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import EmailEditor from "./components/EmailEditor";
import SavedTemplates from "./components/SavedTemplates";

const App = () => {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand Name */}
          <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200">
            Email Builder
          </Link>
          {/* Links */}
          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-white text-lg hover:text-blue-200 transition-colors duration-300"
            >
              Email Editor
            </Link>
            <Link
              to="/templates"
              className="text-white text-lg hover:text-blue-200 transition-colors duration-300"
            >
              Saved Templates
            </Link>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="bg-gray-50 min-h-screen py-6">
        <Routes>
          <Route path="/" element={<EmailEditor />} />
          <Route path="/templates" element={<SavedTemplates />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
