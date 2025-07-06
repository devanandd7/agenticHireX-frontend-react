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

  const bgColorClass = {
    indigo: 'bg-indigo-800 border-indigo-600',
    green: 'bg-green-800 border-green-600',
    blue: 'bg-blue-800 border-blue-600',
    red: 'bg-red-800 border-red-600',
    yellow: 'bg-yellow-800 border-yellow-600',
    gray: 'bg-gray-700 border-gray-600',
  }[color] || 'bg-gray-800 border-gray-700';

  const textColorClass = {
    indigo: 'text-indigo-300',
    green: 'text-green-300',
    blue: 'text-blue-300',
    red: 'text-red-300',
    yellow: 'text-yellow-300',
    gray: 'text-gray-300',
  }[color] || 'text-gray-300';

  return (
    <div
      className={`rounded-xl p-6 text-center shadow-lg transition-all duration-700 ease-out transform
        ${bgColorClass}
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}
        hover:scale-105 hover:shadow-2xl`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`text-4xl font-extrabold ${textColorClass}`}>{value}</div>
      <div className="text-gray-200 mt-2 text-lg">{label}</div>
    </div>
  );
};

const UserDashboard = ({ setCurrentPage }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDashboardVisible, setIsDashboardVisible] = useState(false); // State for overall dashboard animation

  // Fetch dashboard data from backend
  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:8000/api/job-application/dashboard', {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-indigo-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-xl text-gray-300">Loading your personalized dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-red-400 p-4">
        <p className="text-center text-lg mb-6">{error}</p>
        <button
          onClick={() => setCurrentPage && setCurrentPage('home')}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 font-inter">
      <div className={`max-w-6xl mx-auto py-8 transition-all duration-1000 ease-out
        ${isDashboardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-400 mb-3 animate-fade-in-down">Your Dashboard</h1>
          <p className="text-xl md:text-2xl text-gray-300 animate-fade-in-down delay-200">Track your job search progress and key statistics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard label="Total Jobs Found" value={stats.totalJobsFound} color="indigo" delay={300} />
          <StatCard label="Matching Jobs" value={stats.matchingJobs} color="green" delay={400} />
          <StatCard label="Applied Jobs" value={stats.appliedJobs} color="blue" delay={500} />
          <StatCard label="Reported Jobs" value={stats.reportedJobs} color="red" delay={600} />
          <StatCard label="Verified Jobs" value={stats.verifiedJobs} color="yellow" delay={700} />
          <StatCard label="Unverified Jobs" value={stats.unverifiedJobs} color="gray" delay={800} />
        </div>

        <div className={`mb-10 bg-gray-800 rounded-xl shadow-lg p-6 border border-purple-700 transition-all duration-700 ease-out delay-[900ms]
          ${isDashboardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-white mb-4">Application Success Rate</h2>
          <div className="text-center text-5xl font-extrabold text-purple-400 animate-pulse-fade">
            {stats.applicationSuccessRate}%
          </div>
          <p className="text-center text-gray-400 mt-2">of your applications lead to positive outcomes!</p>
        </div>

        <div className={`mb-10 bg-gray-800 rounded-xl shadow-lg p-6 border border-teal-700 transition-all duration-700 ease-out delay-[1000ms]
          ${isDashboardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-white mb-4">Jobs by Category</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-lg">
            {Object.entries(stats.jobsByCategory).map(([cat, count], index) => (
              <li key={cat} className="flex justify-between items-center bg-gray-700 p-3 rounded-md border border-gray-600 transition-all duration-300 hover:bg-gray-600">
                <span className="capitalize text-gray-300">{cat.replace(/-/g, ' ')}</span>
                <span className="font-bold text-teal-300">{count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`mb-10 bg-gray-800 rounded-xl shadow-lg p-6 border border-orange-700 transition-all duration-700 ease-out delay-[1100ms]
          ${isDashboardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-white mb-4">Recent Activity (Last 30 days)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <span className="block text-gray-400 text-md">Recent Applications</span>
              <span className="text-4xl font-bold text-green-400 mt-1">{stats.recentActivity.recentApplications}</span>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <span className="block text-gray-400 text-md">Recent Reports</span>
              <span className="text-4xl font-bold text-red-400 mt-1">{stats.recentActivity.recentReports}</span>
            </div>
          </div>
        </div>

        <div className={`mb-10 bg-gray-800 rounded-xl shadow-lg p-6 border border-blue-700 transition-all duration-700 ease-out delay-[1200ms]
          ${isDashboardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-white mb-4">Application Status</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-lg">
            {Object.entries(stats.applicationStatus).map(([status, count], index) => (
              <li key={status} className="flex justify-between items-center bg-gray-700 p-3 rounded-md border border-gray-600 transition-all duration-300 hover:bg-gray-600">
                <span className="capitalize text-gray-300">{status.replace(/-/g, ' ')}</span>
                <span className="font-bold text-blue-300">{count}</span>
              </li>
            ))}
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
