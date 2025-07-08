import React, { useState } from 'react';
import { motion } from "framer-motion";

const UploadResumePage = ({ setCurrentPage }) => {
  const [selectedFile, setSelectedFile] = useState(null); // Stores the File object
  const [resumePreviewUrl, setResumePreviewUrl] = useState(null); // Stores the Data URL for image preview
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [jobResults, setJobResults] = useState([]); // State to store simulated job results
  const [isFileProcessed, setIsFileProcessed] = useState(false); // New state to track if file is processed
  const [showJobDetail, setShowJobDetail] = useState(null); // job id for job detail modal
  const [showCoverLetter, setShowCoverLetter] = useState(null); // job id for cover letter modal
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [verifyingJobId, setVerifyingJobId] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [reportingJobId, setReportingJobId] = useState(null);
  const [reportedJobs, setReportedJobs] = useState([]);
  const [verifiedJobs, setVerifiedJobs] = useState([]);
  const [jobInsights, setJobInsights] = useState(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [insightsError, setInsightsError] = useState('');

  const jobListVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const jobCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } },
  };

  // Dummy job data with 'type' property
  const dummyJobResults = [
    { id: 1, type: 'real', title: 'Senior AI Engineer', company: 'Tech Solutions Inc.', location: 'Remote', description: 'Develop cutting-edge AI models for enterprise solutions.' },
    { id: 2, type: 'fake', title: 'Work From Home Data Entry', company: 'Easy Money Schemes', location: 'Online', description: 'No experience needed! Earn $500/hour from home. (Scam)' },
    { id: 3, type: 'real', title: 'Machine Learning Scientist', company: 'Innovate AI Labs', location: 'New York, NY', description: 'Research and implement advanced ML algorithms.' },
    { id: 4, type: 'fake', title: 'Urgent Crypto Investment', company: 'Global Wealth Partners', location: 'Remote', description: 'Invest now and double your money in 24 hours! (Scam)' },
    { id: 5, type: 'real', title: 'Data Scientist - NLP', company: 'Global Data Corp', location: 'San Francisco, CA', description: 'Analyze large text datasets and build NLP applications.' },
    { id: 6, type: 'real', title: 'AI Research Intern', company: 'FutureTech R&D', location: 'Seattle, WA (Hybrid)', description: 'Assist in experimental AI research projects.' },
    { id: 7, type: 'fake', title: 'Mystery Shopper - High Pay', company: 'Secret Shopper Co.', location: 'Local', description: 'Get paid to shop and evaluate stores. Send us money for training kit. (Scam)' },
    { id: 8, type: 'real', title: 'Computer Vision Engineer', company: 'Visual AI Systems', location: 'Austin, TX', description: 'Design and deploy computer vision systems for automation.' },
  ];

  // Dummy cover letter for demonstration
  const getCoverLetter = (job) =>
    `Dear ${job.company},\n\nI am excited to apply for the position of ${job.title}. My skills and experience make me a great fit for this role.\n\nBest regards,\n[Your Name]`;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setResumePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setResumePreviewUrl(null);
      setJobResults([]); // Clear results if file is deselected
      setIsFileProcessed(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setResumePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);
    setJobResults([]);
    setIsFileProcessed(false);

    try {
      // 1. Upload resume
      const formData = new FormData();
      formData.append('resume', selectedFile);

      // Mock API call for resume upload
      // In a real app, replace this with your actual fetch call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const uploadData = { success: true, message: "Resume uploaded successfully" };
      
      if (!uploadData.success) {
        throw new Error(uploadData.message || 'Resume upload failed');
      }

      // 2. Fetch filtered jobs
      // Mock API call for fetching jobs
      // In a real app, replace this with your actual fetch call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      const jobsData = { success: true, filteredJobs: dummyJobResults }; // Use dummy data
      
      console.log(('Jobs Data:', jobsData));
      if (!jobsData.success) {
        throw new Error(jobsData.message || 'Failed to fetch jobs');
      }

      // 3. Set filtered jobs to state
      setJobResults(jobsData.filteredJobs || []);
      setIsFileProcessed(true);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setResumePreviewUrl(null);
    setJobResults([]);
    setIsFileProcessed(false); // Reset processed state
  };

  const handleVerifyJob = async (jobId) => {
    setVerifyingJobId(jobId);
    setVerificationResult(null);
    try {
      // Mock API call for job verification
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const jobToVerify = dummyJobResults.find(job => (job.id || job.jobId) === jobId);
      const data = {
        success: true,
        isFake: jobToVerify ? jobToVerify.type === 'fake' : true,
        verificationScore: jobToVerify ? (jobToVerify.type === 'real' ? 0.95 : 0.2) : 0,
        reasons: jobToVerify ? (jobToVerify.type === 'fake' ? ['Suspicious salary claims', 'Generic description'] : ['Legitimate company', 'Clear job responsibilities']) : ['Job not found'],
      };
      
      setVerificationResult(data);

      // If verified, add to verifiedJobs
      if (data.success && data.isFake === false) {
        setVerifiedJobs((prev) => [...prev, jobId]);
      }
    } catch (err) {
      setVerificationResult({ error: 'Verification failed' });
    } finally {
      setVerifyingJobId(null);
    }
  };

  const handleReportJob = async (jobId) => {
    setReportingJobId(jobId);
    try {
      // Mock API call for reporting job
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      const data = { success: true, message: "Job reported successfully" };
      
      if (data.success) {
        setReportedJobs((prev) => [...prev, jobId]);
      }
    } catch (err) {
      // handle error
    } finally {
      setReportingJobId(null);
    }
  };

  const handleShowJobDetail = async (jobId) => {
    setShowJobDetail(jobId);
    setJobInsights(null);
    setInsightsError('');
    setInsightsLoading(true);
    try {
      // Mock API call for job insights
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      const job = dummyJobResults.find(j => (j.id || j.jobId) === jobId);
      const data = {
        success: true,
        insights: {
          matchPercentage: job ? (job.type === 'real' ? '85%' : '20%') : 'N/A',
          strengths: job ? (job.type === 'real' ? ['Strong background in AI/ML', 'Relevant project experience'] : ['N/A']) : ['N/A'],
          improvements: job ? (job.type === 'real' ? ['Highlight leadership roles more', 'Quantify impact with metrics'] : ['Lack of specific skills', 'No relevant experience']) : ['N/A'],
          examples: job ? (job.type === 'real' ? ['Led a team of 5 engineers', 'Increased model accuracy by 15%'] : ['N/A']) : ['N/A'],
          recommendations: job ? (job.type === 'real' ? ['Tailor resume keywords', 'Prepare for behavioral questions'] : ['Seek entry-level roles', 'Gain practical experience']) : ['N/A'],
        },
      };

      if (data.success) {
        setJobInsights(data.insights);
      } else {
        setInsightsError(data.message || 'Failed to fetch insights');
      }
    } catch (err) {
      setInsightsError('Failed to fetch insights');
    } finally {
      setInsightsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 font-inter">
      <div className="max-w-7xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
            Upload Your Resume & Find Jobs
          </h1>
          <p className="text-xl text-gray-600">
            Let our AI analyze your resume and instantly show you relevant job matches.
          </p>
        </div>

        {/* Top Section: Resume Upload Area (Always Visible) */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-200 flex flex-col max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Resume Uploads</h2>
          <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center flex-grow flex flex-col items-center justify-center
                ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx,image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              {!selectedFile ? (
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-indigo-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Drop your resume here
                    </h3>
                    <p className="text-gray-600">
                      or click to browse files
                    </p>
                    <p className="text-sm text-gray-500">
                      Supported formats: PDF, DOC, DOCX, Images (max 5MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 w-full">
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-6 h-6 text-indigo-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-800">{selectedFile.name}</p>
                        <p className="text-sm text-gray-600">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-red-600 hover:text-red-700 transition duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={!selectedFile || isProcessing}
                className={`px-8 py-3 rounded-lg font-medium text-white transition duration-200 ease-in-out transform hover:scale-105
                  ${!selectedFile || isProcessing
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed' // Adjusted disabled state
                    : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Analyze Resume & Find Jobs'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Section: Resume Preview and Job Results (Conditional) */}
        {selectedFile && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Resume Preview */}
            <div className="lg:w-1/2 bg-white rounded-2xl shadow-xl p-6 border border-indigo-200 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Resume Preview</h2>
              {resumePreviewUrl && selectedFile && selectedFile.type.startsWith('image/') && (
                <div className="w-full max-h-[calc(100vh-300px)] overflow-hidden rounded-lg border border-gray-200 flex items-center justify-center bg-gray-100">
                  <img src={resumePreviewUrl} alt="Resume Preview" className="max-w-full max-h-full object-contain" />
                </div>
              )}
              {selectedFile && selectedFile.type === 'application/pdf' && (
                <div className="w-full max-h-[calc(100vh-300px)] overflow-hidden rounded-lg border border-gray-200 flex items-center justify-center bg-gray-100">
                  <iframe
                    src={resumePreviewUrl || URL.createObjectURL(selectedFile)}
                    title="PDF Preview"
                    className="w-full h-[500px] rounded-lg"
                  />
                </div>
              )}
              {selectedFile && !selectedFile.type.startsWith('image/') && selectedFile.type !== 'application/pdf' && (
                <div className="text-gray-600 text-sm p-4 text-center">
                  <p>Preview not available for this file type.</p>
                  <p className="mt-2">File: <span className="font-medium text-gray-800">{selectedFile.name}</span></p>
                  <p>Size: <span className="font-medium text-gray-800">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span></p>
                </div>
              )}
            </div>

            {/* Right Column: Job Results */}
            <div className="lg:w-1/2 bg-white rounded-2xl shadow-xl p-6 border border-purple-200 flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Fake and Real Jobs based on Resume</h2>
              {isProcessing && jobResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-600">
                  <svg className="animate-spin h-10 w-10 text-purple-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p>Analyzing your resume and finding jobs...</p>
                </div>
              ) : (
                jobResults.length > 0 ? (
                  <motion.div
                    className="space-y-4 overflow-y-auto max-h-[calc(100vh-250px)] custom-scrollbar"
                    variants={jobListVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {jobResults.map(job => (
                      <motion.div
                        key={job.id || job.jobId}
                        variants={jobCardVariants}
                        className={`p-4 rounded-lg shadow-md border bg-white ${job.type === 'real' ? 'border-green-200' : 'border-red-200'}`}
                      >
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-gray-700 text-sm mb-2">{job.company} - {job.location}</p>
                        <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <a
                            href={job.url || job.applyLink || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm transition duration-200 font-medium px-4 py-2 rounded-lg border-2 ${job.type === 'real' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-red-600 text-white hover:bg-red-700'}`}
                            style={{ textDecoration: 'none' }}
                          >
                            Apply Now
                          </a>
                          {/* Bulb Icon for Job Detail */}
                          <button
                            onClick={() => handleShowJobDetail(job.jobId || job.id)}
                            title="Show Job Details"
                            className="ml-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a7 7 0 00-7 7c0 2.386 1.053 4.507 2.8 5.8A2 2 0 008 17v1a2 2 0 002 2h2a2 2 0 002-2v-1a2 2 0 00.2-.2C17.947 13.507 19 11.386 19 9a7 7 0 00-7-7z" />
                            </svg>
                          </button>
                          {/* Cover Letter Icon */}
                          <button
                            onClick={() => setShowCoverLetter(job.id || job.jobId)}
                            title="Show Job Cover Details"
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center gap-1"
                          >
                            <span className="hidden md:inline text-blue-700 font-medium text-xs md:text-sm">Cover-letter</span>
                          </button>
                          {verifiedJobs.includes(job.jobId || job.id) ? (
                            <span className="text-blue-700 font-semibold ml-2">Verified</span>
                          ) : (
                            <button
                              onClick={() => handleVerifyJob(job.jobId || job.id)}
                              className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
                              disabled={verifyingJobId === (job.jobId || job.id)}
                            >
                              {verifyingJobId === (job.jobId || job.id) ? 'Verifying...' : 'Verify'}
                            </button>
                          )}
                          
                          {reportedJobs.includes(job.jobId || job.id) ? (
                            <span className="text-red-700 font-semibold ml-2">Reported</span>
                          ) : (
                            <button
                              onClick={() => handleReportJob(job.jobId || job.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                              disabled={reportingJobId === (job.jobId || job.id)}
                            >
                              {reportingJobId === (job.jobId || job.id) ? 'Reporting...' : 'Report'}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-600 text-center">
                    <p>No job results to display yet. Upload your resume!</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {showJobDetail && (() => {
          const job = jobResults.find(j => (j.id || j.jobId) === showJobDetail);
          if (!job) return null;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white text-gray-900 rounded-xl shadow-2xl p-0 max-w-md w-full relative flex flex-col"
                style={{ maxHeight: '90vh' }}
              >
                {/* Sticky close button */}
                <button
                  onClick={() => setShowJobDetail(null)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-10 bg-white/80 rounded-full px-2 py-1 shadow"
                  style={{ position: 'sticky', top: 8 }}
                >
                  &times;
                </button>
                <div className="overflow-y-auto p-8 pt-10" style={{ maxHeight: '80vh' }}>
                  <h3 className="text-2xl font-bold mb-2 text-indigo-700 break-words">{job.title}</h3>
                  <div className="mb-2 text-gray-700 text-base font-semibold">
                    <span className="block mb-1">{job.company}</span>
                    <span className="block text-sm text-gray-500">{job.location}</span>
                  </div>
                  <hr className="my-4 border-gray-200" />
                  <div className="text-gray-800 text-base whitespace-pre-line leading-relaxed break-words" style={{ wordBreak: 'break-word' }}>
                    {job.description}
                  </div>
                  <hr className="my-4 border-gray-200" />
                  <div>
                    <h4 className="text-lg font-bold text-indigo-600 mb-2">Job Insights</h4>
                    {insightsLoading ? (
                      <div className="text-center text-gray-700 py-4">Loading insights...</div>
                    ) : insightsError ? (
                      <div className="text-red-700 py-2">{insightsError}</div>
                    ) : jobInsights ? (
                      <div className="space-y-2 text-gray-800"> {/* Default text color for insights content */}
                        <div><strong>Match %:</strong> {jobInsights.matchPercentage}</div>
                        <div>
                          <strong>Strengths:</strong>
                          <ul className="list-disc ml-6">
                            {jobInsights.strengths && jobInsights.strengths.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                        <div>
                          <strong>Improvements:</strong>
                          <ul className="list-disc ml-6">
                            {jobInsights.improvements && jobInsights.improvements.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                        <div>
                          <strong>Examples:</strong>
                          <ul className="list-disc ml-6">
                            {jobInsights.examples && jobInsights.examples.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                        <div>
                          <strong>Recommendations:</strong>
                          <ul className="list-disc ml-6">
                            {jobInsights.recommendations && jobInsights.recommendations.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500">No insights available.</div>
                    )}
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => setShowJobDetail(null)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}

        {showCoverLetter && (() => {
          const job = jobResults.find(j => (j.id || j.jobId) === showCoverLetter);
          if (!job) return null;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white text-gray-900 rounded-xl shadow-2xl p-0 max-w-md w-full relative flex flex-col"
                style={{ maxHeight: '90vh' }}
              >
                {/* Sticky close button */}
                <button
                  onClick={() => setShowCoverLetter(null)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-10 bg-white/80 rounded-full px-2 py-1 shadow"
                  style={{ position: 'sticky', top: 8 }}
                >
                  &times;
                </button>
                <div className="overflow-y-auto p-8 pt-10" style={{ maxHeight: '80vh' }}>
                  <h3 className="text-2xl font-bold mb-4 text-blue-700 break-words">Cover Letter</h3>
                  <pre className="bg-gray-100 rounded-lg p-4 text-base whitespace-pre-wrap mb-6 text-gray-800 break-words" style={{ wordBreak: 'break-word' }}>{getCoverLetter(job)}</pre>
                  <div className="flex justify-between gap-2 mt-2">
                    <button
                      onClick={() => {
                        document.execCommand('copy'); // Use document.execCommand for clipboard in iframe
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold shadow"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2V7a2 2 0 00-2-2h-6a2 2 0 00-2 2v13a2 2 0 002 2z" />
                      </svg>
                      {copied ? "Copied!" : "Copy Cover Letter"}
                    </button>
                    <button
                      onClick={() => setShowCoverLetter(null)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}

        {verifyingJobId && verificationResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white text-gray-900 rounded-xl shadow-2xl p-0 max-w-md w-full relative flex flex-col"
              style={{ maxHeight: '90vh' }}
            >
              {/* Sticky close button */}
              <button
                onClick={() => { setVerifyingJobId(null); setVerificationResult(null); }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-10 bg-white/80 rounded-full px-2 py-1 shadow"
                style={{ position: 'sticky', top: 8 }}
              >
                &times;
              </button>
              <div className="overflow-y-auto p-8 pt-10" style={{ maxHeight: '80vh' }}>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Job Verification</h3>
                {verificationResult.error ? (
                  <p className="text-red-700">{verificationResult.error}</p>
                ) : (
                  <>
                    <p className="text-gray-800"><strong>Status:</strong> {verificationResult.isFake ? 'Fake' : 'Verified'}</p>
                    <p className="text-gray-800"><strong>Verification Score:</strong> {verificationResult.verificationScore}</p>
                    <p className="text-gray-800"><strong>Reasons:</strong></p>
                    <ul className="list-disc ml-6 text-gray-800">
                      {verificationResult.reasons && verificationResult.reasons.map((reason, idx) => (
                        <li key={idx}>{reason}</li>
                      ))}
                    </ul>
                  </>
                )}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => { setVerifyingJobId(null); setVerificationResult(null); }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadResumePage;
