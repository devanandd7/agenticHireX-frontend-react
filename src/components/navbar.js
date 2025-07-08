// Navbar.js
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  // Listen for changes to localStorage (e.g., login/logout in other tabs)
  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(!!localStorage.getItem('authToken'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Uploads', path: '/resumejobs' },
    { name: 'Contact', path: '/contact' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const handleNavLinkClick = (path) => {
    setActivePath(path);
    navigate(path);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl sticky top-0 z-50 rounded-b-lg py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-indigo-700 text-3xl md:text-4xl font-extrabold tracking-wide">AgenticHireX</div> {/* Changed to text-indigo-700 */}
        <ul className="flex list-none p-0 m-0 font-medium text-sm md:text-base space-x-2 md:space-x-4 items-center">
          {navLinks.map(link => (
            // Adjusted text colors for white bg
            <motion.li
              key={link.name}
              initial={false}
              animate={{
                backgroundColor:
                  activePath === link.path ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0)", // Lighter active background
              }}
              className={`relative px-4 py-2 rounded-lg cursor-pointer flex items-center justify-center flex-1 min-w-0 select-none
                ${activePath === link.path ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-500'}`}
              onClick={() => handleNavLinkClick(link.path)}
              style={{ height: '40px' }}
            >
              {link.name}
              <AnimatePresence>
                {activePath === link.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full" // Changed to bg-indigo-600
                    layoutId="underline"
                    id="underline"
                    initial={{ opacity: 0, scaleX: 0.5 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.5 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </AnimatePresence>
            </motion.li>
          ))}
          {/* Login/Logout Button */}
          <li>
            {isAuthenticated ? (
              <button
                className="ml-4 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition" // Adjusted button color slightly
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="ml-4 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition" // Adjusted button color slightly
                onClick={handleLogin}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
