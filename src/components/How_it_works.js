import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion

// Data for job matches
const jobMatches = [
  {
    title: "Senior Frontend Developer",
    company: "TechCo - Remote",
    compatibility: "99%",
  },
  {
    title: "Full Stack Engineer",
    company: "StartupX - San Francisco",
    compatibility: "92%",
  },
  {
    title: "React Developer",
    company: "StartupX - San Francisco",
    compatibility: "89%",
  },
  {
    title: "Software Engineer",
    company: "TechCo - Remote",
    compatibility: "88%",
  },
];

// Data for application status
const applicationStatusList = [
  {
    step: "Senior React Developer",
    status: "Interview", // Changed to actual status
    detail: "Technical Interview was scheduled 2 days ago",
  },
  {
    step: "Frontend Lead",
    status: "In Progress", // Changed to actual status
    detail: "CodeTest Uploaded 1 week ago. HR Review",
  },
  {
    step: "Full Stack Engineer",
    status: "Submitted", // Changed to actual status
    detail: "Applied 2 days ago Initial Review",
  },
  {
    step: "Full Stack Engineer",
    status: "Rejected", // Changed to actual status
    detail: "HR Review",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger children animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function App() {
  return (
    <div className="app container mx-auto p-6 font-sans text-gray-900 min-h-screen bg-gray-50">
      {/* Header Section was here, now removed */}

      <main className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-4"> {/* Adjusted mt-12 to mt-4 */}
        {/* Left Main Panel */}
        <section className="md:col-span-7 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 border-b pb-4">
            How it Works
          </h2>

          {/* Stats with animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} // Animate when in view
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" // Adjusted grid for responsiveness
          >
            <motion.div variants={itemVariants} className="bg-gray-50 p-4 rounded shadow-sm text-center">
              <h3 className="text-xl font-semibold">Job Matches</h3>
              <p className="text-4xl text-blue-700 font-black">24</p>
              <p className="text-gray-500">89% compatibility</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-gray-50 p-4 rounded shadow-sm text-center">
              <h3 className="text-xl font-semibold">Applications</h3>
              <p className="text-4xl text-blue-700 font-black">12</p>
              <p className="text-green-600">3 in progress</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-gray-50 p-4 rounded shadow-sm text-center">
              <h3 className="text-xl font-semibold">Success Rate</h3>
              <p className="text-4xl text-blue-700 font-black">89%</p>
              <p className="text-gray-500">ATS approved</p>
            </motion.div>
          </motion.div>

          {/* Top Job Matches Section with animation */}
          <section id="jobmatches" className="mb-10">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">
              Top Job Matches
            </h2>
            <motion.table
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
              className="w-full text-left border-collapse border border-gray-200 rounded-lg overflow-hidden"
            >
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border border-gray-200">Job</th>
                  <th className="p-3 border border-gray-200">Compatibility</th> {/* Changed to Compatibility */}
                  <th className="p-3 border border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobMatches.map((job, index) => (
                  <motion.tr
                    key={index}
                    variants={slideInLeftVariants} // Apply slide-in animation to each row
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-3 border border-gray-200">
                      <p className="font-semibold">{job.title}</p>
                      <p className="text-gray-600 text-sm">{job.company}</p>
                    </td>
                    <td className="p-3 border border-gray-200 text-green-700 font-semibold">
                      {job.compatibility}
                    </td>
                    <td className="p-3 border border-gray-200 space-x-3">
                      <button className="px-3 py-1 rounded text-blue-700 border border-blue-700 hover:bg-blue-100">
                        View
                      </button>
                      <button className="px-3 py-1 rounded text-white bg-blue-700 hover:bg-blue-800">
                        Apply
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </section>
        </section>

        {/* Right Info Panel with animation */}
        <aside className="md:col-span-5 flex flex-col p-8 bg-white rounded-lg shadow-md"> {/* Added bg-white and shadow-md */}
          <h3 className="text-2xl font-bold mb-6 border-b pb-4">Application Status</h3> {/* Changed font size and added border */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {applicationStatusList.map((app, i) => {
              let statusColor = "text-gray-700";
              if (app.status === "Interview") {
                statusColor = "text-green-600 font-semibold";
              } else if (app.status === "In Progress") {
                statusColor = "text-blue-600 font-semibold";
              } else if (app.status === "Submitted") {
                statusColor = "text-yellow-600 font-semibold";
              } else if (app.status === "Rejected") {
                statusColor = "text-red-600 font-semibold";
              }

              return (
                <motion.li
                  key={i}
                  variants={slideInRightVariants} // Apply slide-in animation to each list item
                  className="border border-gray-200 rounded mb-3 p-4 bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold">{app.step}</p>
                    <p className={statusColor}>{app.status}</p>
                  </div>
                  <p className="text-gray-600 text-sm">{app.detail}</p>
                </motion.li>
              );
            })}
          </motion.ul>
        </aside>
      </main>
    </div>
  );
}

export default App;
