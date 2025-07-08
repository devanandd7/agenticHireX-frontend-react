import React, { useEffect, useState } from 'react';

// A helper component for animated stat cards
const StatCard = ({ label, value, color, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Adjusted colors for white background
  const bgColorClass = {
    indigo: 'bg-indigo-50 border-indigo-200', // Lighter background
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
    red: 'bg-red-50 border-red-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    gray: 'bg-gray-50 border-gray-200',
  }[color] || 'bg-gray-50 border-gray-200';

  const textColorClass = {
    indigo: 'text-indigo-700', // Darker text
    green: 'text-green-700',
    blue: 'text-blue-700',
    red: 'text-red-700',
    yellow: 'text-yellow-700',
    gray: 'text-gray-700',
  }[color] || 'text-gray-700';

  return (
    <div
      className={`rounded-xl p-6 text-center shadow-lg transition-all duration-700 ease-out transform
        ${bgColorClass}
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}
        hover:scale-105 hover:shadow-2xl`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`text-4xl font-extrabold ${textColorClass}`}>{value}</div>
      <div className="text-gray-600 mt-2 text-lg">{label}</div> {/* Adjusted for white background */}
    </div>
  );
};

const UserDashboard = ({ setCurrentPage }) => {
  const [stats, setStats] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileError, setProfileError] = useState('');
  const [isDashboardVisible, setIsDashboardVisible] = useState(false); // State for overall dashboard animation

  // Fetch dashboard data from backend
  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError('');
      try {
        const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';
        const res = await fetch(`${API_BASE}/api/job-application/dashboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setStats(data.statistics);
          setIsDashboardVisible(true); // Trigger dashboard entry animation
        } else {
          setError(data.message || 'Failed to load dashboard');
        }
      } catch (err) {
        setError('Failed to load dashboard due to an unexpected error.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      setProfileLoading(true);
      setProfileError('');
      try {
        const res = await fetch('http://localhost:8000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const data = await res.json();
        if (res.ok && data && data.user) {
          setProfile(data.user);
        } else {
          setProfileError(data.message || 'Failed to load profile');
        }
      } catch (err) {
        setProfileError('Failed to load profile due to an unexpected error.');
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800"> {/* Changed background and text color */}
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> {/* Changed spinner color */}
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-xl text-gray-600">Loading your personalized dashboard...</p> {/* Adjusted text color */}
        </div>
      </div>
    );
  }

  if (error || profileError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-600 p-4"> {/* Changed background and text color */}
        <p className="text-center text-lg mb-6">{error || profileError}</p>
        <button
          onClick={() => setCurrentPage && setCurrentPage('home')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105" // Adjusted button style
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!stats || !profile) return null;

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 font-inter"> {/* Main background and default text color */}
      <div className={`max-w-6xl mx-auto py-8 transition-all duration-1000 ease-out
        ${isDashboardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Profile Card */}
        <div className="mb-10 flex items-center bg-white rounded-xl shadow-lg p-6 border border-indigo-200"> {/* Changed background and border */}
          <div className="flex-shrink-0 w-20 h-20 rounded-full bg-indigo-200 flex items-center justify-center text-3xl font-bold text-indigo-700 mr-6"> {/* Adjusted avatar background and text color */}
            {profile.name ? profile.name[0].toUpperCase() : '?'}
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-700">{profile.name || 'User'}</div> {/* Darker text */}
            <div className="text-lg text-gray-700">{profile.email || ''}</div> {/* Darker text */}
            <div className="text-sm text-gray-500">User ID: {profile.id}</div> {/* Darker text */}
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 mb-3 animate-fade-in-down">Your Dashboard</h1> {/* Darker text */}
          <p className="text-xl md:text-2xl text-gray-600 animate-fade-in-down delay-200">Track your job search progress and key statistics</p> {/* Darker text */}
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard label="Total Jobs Found" value={stats.totalJobsFound} color="indigo" delay={300} />
          <StatCard label="Applied Jobs" value={stats.appliedJobs} color="blue" delay={500} />
          <StatCard label="Reported Jobs" value={stats.reportedJobs} color="red" delay={600} />
          <StatCard label="Verified Jobs" value={stats.verifiedJobs} color="yellow" delay={700} />
          <StatCard label="Unverified Jobs" value={stats.unverifiedJobs} color="gray" delay={800} />
        </div>

        {/* Application Success Rate */}
        <div className="mb-10 bg-white rounded-xl shadow-lg p-6 border border-purple-200"> {/* Changed background and border */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Application Success Rate</h2> {/* Darker text */}
          <div className="text-center text-5xl font-extrabold text-purple-700 animate-pulse-fade"> {/* Darker text */}
            {stats.applicationSuccessRate}%
          </div>
          <p className="text-center text-gray-600 mt-2">of your applications lead to positive outcomes!</p> {/* Darker text */}
        </div>

        {/* Jobs by Category */}
        <div className="mb-10 bg-white rounded-xl shadow-lg p-6 border border-teal-200"> {/* Changed background and border */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Jobs by Category</h2> {/* Darker text */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-lg">
            {stats.jobsByCategory && Object.keys(stats.jobsByCategory).length > 0 ? (
              Object.entries(stats.jobsByCategory).map(([cat, count]) => (
                <li key={cat} className="flex justify-between items-center bg-gray-100 p-3 rounded-md border border-gray-200 transition-all duration-300 hover:bg-gray-200">
                  <span className="capitalize text-gray-700">{cat.replace(/-/g, ' ')}</span>
                  <span className="font-bold text-teal-700">{count}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No categories found.</li>
            )}
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="mb-10 bg-white rounded-xl shadow-lg p-6 border border-orange-200"> {/* Changed background and border */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Recent Activity (Last 30 days)</h2> {/* Darker text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200"> {/* Lighter background and border */}
              <span className="block text-gray-600 text-md">Recent Applications</span> {/* Darker text */}
              <span className="text-4xl font-bold text-green-700 mt-1">{stats.recentActivity?.recentApplications ?? 0}</span> {/* Darker text */}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200"> {/* Lighter background and border */}
              <span className="block text-gray-600 text-md">Recent Reports</span> {/* Darker text */}
              <span className="text-4xl font-bold text-red-700 mt-1">{stats.recentActivity?.recentReports ?? 0}</span> {/* Darker text */}
            </div>
          </div>
        </div>

        {/* Application Status */}
        <div className="mb-10 bg-white rounded-xl shadow-lg p-6 border border-blue-200"> {/* Changed background and border */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Application Status</h2> {/* Darker text */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-lg">
            {stats.applicationStatus && Object.keys(stats.applicationStatus).length > 0 ? (
              Object.entries(stats.applicationStatus).map(([status, count]) => (
                <li key={status} className="flex justify-between items-center bg-gray-100 p-3 rounded-md border border-gray-200 transition-all duration-300 hover:bg-gray-200">
                  <span className="capitalize text-gray-700">{status.replace(/-/g, ' ')}</span>
                  <span className="font-bold text-blue-700">{count}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No application status data.</li>
            )}
          </ul>
        </div>

      </div>

      {/* Global CSS for animations */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
          opacity: 0; /* Ensures it starts hidden */
        }
        .animate-fade-in-down.delay-200 { animation-delay: 0.2s; }

        @keyframes pulseFade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-fade {
          animation: pulseFade 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;
