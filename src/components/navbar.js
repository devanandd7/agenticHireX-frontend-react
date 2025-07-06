"use client" // This directive is often used in Next.js, but included for context if you're using a similar setup.

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion"; // Corrected import from "motion/react" and "motion/react-client"
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Uploads', path: '/resumejobs' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Contact', path: '/contact' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const handleNavLinkClick = (path) => {
    setActivePath(path);
    navigate(path);
  };

  return (
    <nav className="bg-gray-950 bg-opacity-80 backdrop-blur-md shadow-xl sticky top-0 z-50 rounded-b-lg py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-indigo-400 text-3xl md:text-4xl font-extrabold tracking-wide">AgenticHireX</div>
        <ul className="flex list-none p-0 m-0 font-medium text-sm md:text-base space-x-2 md:space-x-4">
          {navLinks.map(link => (
            <motion.li
              key={link.name}
              initial={false}
              animate={{
                backgroundColor:
                  activePath === link.path ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
              }}
              className={`relative px-4 py-2 rounded-lg cursor-pointer flex items-center justify-center flex-1 min-w-0 select-none
                ${activePath === link.path ? 'text-indigo-300' : 'text-gray-300 hover:text-indigo-200'}`}
              onClick={() => handleNavLinkClick(link.path)}
              style={{ height: '40px' }}
            >
              {link.name}
              <AnimatePresence>
                {activePath === link.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-400 rounded-full"
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
