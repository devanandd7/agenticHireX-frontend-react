import React, { useState } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'; // Install @heroicons/react if not already

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4 font-inter">
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-10 grid grid-cols-1 md:grid-cols-2 gap-10 transition-all">
        
        {/* Form Column */}
        <div>
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Let's Connect</h1>
          <p className="text-gray-600 mb-8">We’d love to hear from you! Fill in your details and we’ll get back soon.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {['name', 'email', 'subject'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-semibold text-gray-700 mb-1 capitalize">{field}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none transition"
                  placeholder={`Your ${field}`}
                  required
                />
              </div>
            ))}

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none resize-y transition"
                placeholder="Write your message..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-accent text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            {/* Feedback Messages */}
            {status === 'success' && (
              <div className="flex items-center text-green-600 font-semibold space-x-2 mt-2">
                <CheckCircleIcon className="h-5 w-5" />
                <span>Your message has been sent!</span>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center text-red-600 font-semibold space-x-2 mt-2">
                <ExclamationCircleIcon className="h-5 w-5" />
                <span>Oops! Something went wrong.</span>
              </div>
            )}
          </form>
        </div>

        {/* Image Column */}
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://placehold.co/400x500/4F46E5/FFFFFF?text=Let's+Talk"
            alt="Contact"
            className="rounded-lg shadow-lg object-cover w-full h-auto"
          />
          <div className="mt-6 text-center text-gray-700">
            <h2 className="text-xl font-bold mb-1">Still not sure?</h2>
            <p>Reach us via:</p>
            <p className="mt-2">
              📧 <a href="mailto:info@example.com" className="text-primary hover:underline">info@example.com</a>
            </p>
            <p>
              📞 <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
            </p>
            <p>🏢 123 Main St, Anytown, USA</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
