import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Add this line

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsLoading(true);

    try {
      // Basic validation
      if (!email || !password) {
        throw new Error('Please enter both email and password.');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }

      // Call AgenticHireX backend for login
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          emailPassword: password, // Backend expects emailPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token); // Store token for authenticated requests
        setIsAuthenticated(true); // Update authentication state
        navigate('/resumejobs'); // Redirect to home page
      } else {
        throw new Error(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-inter"> {/* Changed background to white */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-indigo-200"> {/* Changed card background to white and border to lighter indigo */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Welcome Back!</h2> {/* Changed text to dark gray */}
        <p className="text-gray-600 text-center mb-6">Log in to continue your job search journey.</p> {/* Changed text to medium gray */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label> {/* Changed text to gray-700 */}
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" /* Adjusted input bg, border, text, placeholder */
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label> {/* Changed text to gray-700 */}
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" /* Adjusted input bg, border, text, placeholder */
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition duration-300 ease-in-out transform hover:scale-105
              ${isLoading
                ? 'bg-indigo-400 cursor-not-allowed opacity-75' // Adjusted disabled state for white background
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'
              }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Logging in...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-indigo-600 hover:text-indigo-700 font-medium transition duration-200"
          >
            Sign Up
          </button>
        </p>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 text-sm transition duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
