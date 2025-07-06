import logo from './logo.svg';
// import '@fontsource/inter/variable.css';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';

import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Home from './components/home';
import Navbar from './components/navbar';
import UploadResumePage from './components/UploadResumePage'; // Add this import
import UserDashboard from './components/UserDashboard'; // <-- Add this

function App() {
  // Simple authentication check (replace with real logic/token check)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Pass setIsAuthenticated to Login to update auth state after login
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resumejobs" element={<UploadResumePage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        {/* Optionally, fallback route */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
