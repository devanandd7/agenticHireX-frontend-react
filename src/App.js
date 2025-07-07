import logo from './logo.svg';
// import '@fontsource/inter/variable.css';

import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';

import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Home from './components/home'; // This is likely the LandingPage component
import Navbar from './components/navbar';
import UploadResumePage from './components/UploadResumePage';
import UserDashboard from './components/UserDashboard';
import PrivateRoute from './components/auth/privateRoute';
import Contact from './components/contact';
import WeScrollAnimationPage from './components/we'; // Import the WeScrollAnimationPage component

// New component to wrap the content that uses useNavigate
function MainAppContent() {
  // Simple authentication check (replace with real logic/token check)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Hook to get the navigate function from react-router-dom

  // Define a mapping from page names (used by setCurrentPage in child components) to their routes
  const pageRoutes = {
    home: '/',
    login: '/login',
    signup: '/signup',
    resumejobs: '/resumejobs',
    dashboard: '/dashboard',
    contact: '/contact',
    'we-animation': '/we-animation', // Add the route for WeScrollAnimationPage
    // Add other page mappings here as needed for any other components that use setCurrentPage
  };

  // This function will be passed as the 'setCurrentPage' prop to child components.
  // It translates the page name into a router path and navigates.
  const handleSetCurrentPage = (pageName) => {
    const path = pageRoutes[pageName];
    if (path) {
      navigate(path);
    } else {
      console.warn(`Route for page '${pageName}' not found. Navigating to home.`);
      navigate('/'); // Fallback to home if route is not defined
    }
  };

  return (
    <>
      {/* Navbar component, pass handleSetCurrentPage if it has navigation buttons */}
      <Navbar setCurrentPage={handleSetCurrentPage} /> 
      <Routes>
        {/* Home page route, pass handleSetCurrentPage for its navigation buttons */}
        <Route
          path="/"
          element={<Home setCurrentPage={handleSetCurrentPage} />}
        />
        {/* Login page route */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} setCurrentPage={handleSetCurrentPage} />}
        />
        {/* Signup page route */}
        <Route path="/signup" element={<Signup setCurrentPage={handleSetCurrentPage} />} />
        
        {/* Protected routes */}
        <Route path="/resumejobs" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <UploadResumePage setCurrentPage={handleSetCurrentPage} />
          </PrivateRoute>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <UserDashboard setCurrentPage={handleSetCurrentPage} />
          </PrivateRoute>
        } />
        <Route path="/contact" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Contact setCurrentPage={handleSetCurrentPage} />
          </PrivateRoute>
        } />

        {/* New route for the WeScrollAnimationPage */}
        <Route
          path="/we-animation"
          element={<WeScrollAnimationPage setCurrentPage={handleSetCurrentPage} />}
        />

        {/* Optionally, add a fallback route for unmatched paths */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </>
  );
}

// The main App component now only renders the Router and MainAppContent
function App() {
  return (
    <Router>
      <MainAppContent />
    </Router>
  );
}

export default App;
