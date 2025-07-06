import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ResumeUploads from './UploadResumePage'; // Adjust the import path as necessary

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'ResumeJobs', path: '/resumejobs' }, // <-- update this
    { name: 'Jobs', path: '/jobs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-indigo-400 text-2xl font-bold">AgenticHireX</div>
        <div className="flex space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-lg font-medium transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-indigo-400 border-b-2 border-indigo-400'
                  : 'text-gray-300 hover:text-indigo-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;