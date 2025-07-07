import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Code, Globe, Github, Linkedin } from 'lucide-react';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [resumeTransform, setResumeTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const calculateResumeTransform = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = mousePosition.x - centerX;
      const deltaY = mousePosition.y - centerY;
      
      // Calculate subtle movement and scale based on cursor position
      const maxMovement = 15;
      const moveX = Math.max(-maxMovement, Math.min(maxMovement, (deltaX / centerX) * maxMovement));
      const moveY = Math.max(-maxMovement, Math.min(maxMovement, (deltaY / centerY) * maxMovement));
      
      // Scale effect based on distance from center
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const scale = 1 + (distance / maxDistance) * 0.05;
      
      setResumeTransform({ x: moveX, y: moveY, scale: Math.min(scale, 1.08) });
    };

    calculateResumeTransform();
  }, [mousePosition]);

  const handleSectionHover = (section) => {
    setHoveredSection(section);
  };

  const handleSectionLeave = () => {
    setHoveredSection(null);
  };

  return (
    // Added cursor-none to hide the default mouse cursor
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8 overflow-hidden relative cursor-none">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Interactive Resume */}
      <div 
        className="relative z-10 max-w-4xl w-full transition-all duration-300 ease-out"
        style={{
          transform: `translate(${resumeTransform.x}px, ${resumeTransform.y}px) scale(${resumeTransform.scale})`,
          transformOrigin: 'center'
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header Section */}
          <div 
            className={`bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white transition-all duration-300 ${
              hoveredSection === 'header' ? 'from-purple-500 to-blue-500 shadow-lg' : ''
            }`}
            onMouseEnter={() => handleSectionHover('header')}
            onMouseLeave={handleSectionLeave}
          >
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User size={40} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">John Doe</h1>
                <p className="text-xl text-purple-100 mb-4">Senior Full Stack Developer</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span>john.doe@email.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            {/* Left Column */}
            <div className="md:col-span-1 bg-gray-50 p-6 space-y-6">
              {/* Skills Section */}
              <div 
                className={`transition-all duration-300 ${
                  hoveredSection === 'skills' ? 'transform scale-105 bg-white rounded-lg p-4 shadow-md' : ''
                }`}
                onMouseEnter={() => handleSectionHover('skills')}
                onMouseLeave={handleSectionLeave}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Code className="mr-2" size={20} />
                  Technical Skills
                </h3>
                <div className="space-y-3">
                  {[
                    { skill: 'React/TypeScript', level: 95 },
                    { skill: 'Node.js', level: 90 },
                    { skill: 'Python', level: 85 },
                    { skill: 'AWS/Cloud', level: 80 },
                    { skill: 'Database Design', level: 88 }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{item.skill}</span>
                        <span className="text-gray-500">{item.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${hoveredSection === 'skills' ? item.level : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links Section */}
              <div 
                className={`transition-all duration-300 ${
                  hoveredSection === 'links' ? 'transform scale-105 bg-white rounded-lg p-4 shadow-md' : ''
                }`}
                onMouseEnter={() => handleSectionHover('links')}
                onMouseLeave={handleSectionLeave}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Globe className="mr-2" size={20} />
                  Links
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors cursor-pointer">
                    <Github size={18} />
                    <span>github.com/johndoe</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                    <Linkedin size={18} />
                    <span>linkedin.com/in/johndoe</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 hover:text-green-600 transition-colors cursor-pointer">
                    <Globe size={18} />
                    <span>johndoe.dev</span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div 
                className={`transition-all duration-300 ${
                  hoveredSection === 'certs' ? 'transform scale-105 bg-white rounded-lg p-4 shadow-md' : ''
                }`}
                onMouseEnter={() => handleSectionHover('certs')}
                onMouseLeave={handleSectionLeave}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Award className="mr-2" size={20} />
                  Certifications
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>AWS Solutions Architect</div>
                  <div>Google Cloud Professional</div>
                  <div>React Developer Certification</div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-2 p-6 space-y-6">
              {/* Experience Section */}
              <div 
                className={`transition-all duration-300 ${
                  hoveredSection === 'experience' ? 'transform scale-102 bg-gray-50 rounded-lg p-4 shadow-md' : ''
                }`}
                onMouseEnter={() => handleSectionHover('experience')}
                onMouseLeave={handleSectionLeave}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <Briefcase className="mr-3" size={24} />
                  Professional Experience
                </h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-800">Senior Full Stack Developer</h4>
                    <p className="text-purple-600 font-medium">TechCorp Inc. • 2021 - Present</p>
                    <ul className="mt-3 text-gray-600 space-y-1 text-sm">
                      <li>• Led development of microservices architecture serving 1M+ users</li>
                      <li>• Implemented CI/CD pipelines reducing deployment time by 60%</li>
                      <li>• Mentored junior developers and conducted code reviews</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-800">Full Stack Developer</h4>
                    <p className="text-blue-600 font-medium">StartupXYZ • 2019 - 2021</p>
                    <ul className="mt-3 text-gray-600 space-y-1 text-sm">
                      <li>• Built responsive web applications using React and Node.js</li>
                      <li>• Optimized database queries improving performance by 40%</li>
                      <li>• Collaborated with design team to implement pixel-perfect UIs</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="text-lg font-semibold text-gray-800">Frontend Developer</h4>
                    <p className="text-green-600 font-medium">WebSolutions • 2018 - 2019</p>
                    <ul className="mt-3 text-gray-600 space-y-1 text-sm">
                      <li>• Developed interactive web interfaces for e-commerce platforms</li>
                      <li>• Implemented responsive designs across multiple devices</li>
                      <li>• Integrated third-party APIs and payment systems</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div 
                className={`transition-all duration-300 ${
                  hoveredSection === 'education' ? 'transform scale-102 bg-gray-50 rounded-lg p-4 shadow-md' : ''
                }`}
                onMouseEnter={() => handleSectionHover('education')}
                onMouseLeave={handleSectionLeave}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <GraduationCap className="mr-3" size={24} />
                  Education
                </h3>
                <div className="border-l-4 border-indigo-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-800">Bachelor of Science in Computer Science</h4>
                  <p className="text-indigo-600 font-medium">University of California, Berkeley • 2014 - 2018</p>
                  <p className="mt-2 text-gray-600 text-sm">Magna Cum Laude • GPA: 3.8/4.0</p>
                </div>
              </div>

              {/* Projects Section */}
              <div 
                className={`transition-all duration-300 ${
                  hoveredSection === 'projects' ? 'transform scale-102 bg-gray-50 rounded-lg p-4 shadow-md' : ''
                }`}
                onMouseEnter={() => handleSectionHover('projects')}
                onMouseLeave={handleSectionLeave}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Projects</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h4 className="font-semibold text-gray-800">E-Commerce Platform</h4>
                    <p className="text-sm text-gray-600 mt-1">Full-stack application with React, Node.js, and PostgreSQL</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h4 className="font-semibold text-gray-800">Task Management App</h4>
                    <p className="text-sm text-gray-600 mt-1">Real-time collaboration tool with WebSocket integration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating custom "AI" cursor */}
      <div 
        className="fixed pointer-events-none z-20 transition-all duration-100 ease-out flex items-center justify-center font-bold text-sm
                   bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-clip-text text-transparent" // Added gradient classes
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)', // Center the "AI" text on the cursor position
          textShadow: '0 0 10px rgba(147, 51, 234, 0.8), 0 0 20px rgba(60, 100, 250, 0.6)' // Glow effect
        }}
      >
        AI
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center z-10">
        <p className="text-lg font-semibold mb-2 drop-shadow-lg">Move your cursor around</p>
        <p className="text-sm opacity-80 drop-shadow-lg">Watch the resume respond to your movement</p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
      <div className="absolute top-16 right-12 w-1 h-1 bg-blue-300 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-16 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce"></div>
      <div className="absolute bottom-32 right-8 w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-700"></div>
    </div>
  );
}

export default App;
