import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const SignupPage = ({ setCurrentPage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Use Navigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages
    setIsLoading(true);

    // Frontend validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting signup with:', { name, email, password });
      // Make a POST request to your backend's /api/auth/signup endpoint
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          emailPassword: password, // Backend expects emailPassword
        }),
      });

      const data = await response.json();

      if (response.ok) { // Check if the response status is 2xx
        console.log('Signup successful!', data);
        setSuccessMessage('Account created successfully! Redirecting to login...');
        // In a real app, you might store the token (data.token) in localStorage
        // localStorage.setItem('authToken', data.token);
        setTimeout(() => {
          setCurrentPage('login'); // Navigate to login page on successful signup
        }, 1500);
      } else {
        // Handle backend errors (e.g., email already registered, validation errors)
        console.error('Signup failed:', data.message || 'Unknown error');
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Network or unexpected error:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 font-inter">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md border border-indigo-700">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center">Create Your Account</h2>
        <p className="text-gray-300 text-center mb-6">Join AutoHire AI and streamline your job search.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          {successMessage && (
            <p className="text-green-400 text-sm text-center">{successMessage}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition duration-300 ease-in-out transform hover:scale-105
              ${isLoading
                ? 'bg-indigo-700 cursor-not-allowed opacity-75'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'
              }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Signing Up...</span>
              </div>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-indigo-400 hover:text-indigo-300 font-medium transition duration-200"
          >
            Log In
          </button>
        </p>

        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-gray-500 hover:text-gray-400 text-sm transition duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
