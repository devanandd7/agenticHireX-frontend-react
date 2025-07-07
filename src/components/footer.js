import React from 'react';

const Footer = () => (
  <footer className="w-full bg-gray-950 text-gray-300 border-t border-indigo-800 mt-12 py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-inner">
    <div className="flex flex-col md:flex-row items-center gap-2">
      <span className="text-indigo-400 font-extrabold text-lg">AgenticHireX</span>
      <span className="hidden md:inline text-gray-500 mx-2">|</span>
      <span className="text-sm">Empowering Smarter Job Search</span>
    </div>
    <div className="flex items-center gap-4 text-sm">
      <a href="/" className="hover:text-indigo-300 transition">Home</a>
      <a href="/contact" className="hover:text-indigo-300 transition">Contact</a>
      <a href="/dashboard" className="hover:text-indigo-300 transition">Dashboard</a>
    </div>
    <div className="text-xs text-gray-500 mt-2 md:mt-0">&copy; {new Date().getFullYear()} AgenticHireX. All rights reserved.</div>
  </footer>
);

export default Footer;
