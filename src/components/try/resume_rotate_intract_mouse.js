import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Globe, Github, Linkedin, Award, Star, Calendar, Building } from 'lucide-react';

// Removed the 'interface Resume' definition as it's TypeScript specific.

function App() {
  const [currentResumeIndex, setCurrentResumeIndex] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationTime, setAnimationTime] = useState(0);

  // Ref to ensure resume change only happens once per "flip" (180 degree rotation)
  const hasTriggeredFlipChangeRef = useRef(false);
  // Ref to ensure resume change only happens once for the specific (X,Y,Z) values
  // This ref is now unused as the specific XYZ trigger logic was removed in previous iterations.
  const hasTriggeredSpecificValueChangeRef = useRef(false);

  // The 'resumes' array is now a regular JavaScript array, no type annotation needed.
  const resumes = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Frontend Developer",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 234-5678",
      location: "New York, NY",
      summary: "Passionate frontend developer with 5+ years of experience creating exceptional user experiences. Specialized in React ecosystem and modern web technologies.",
      skills: [
        { skill: "React & TypeScript", level: 95, category: "Frontend" },
        { skill: "Next.js & Gatsby", level: 90, category: "Framework" },
        { skill: "CSS & Tailwind", level: 92, category: "Styling" },
        { skill: "JavaScript ES6+", level: 88, category: "Language" },
        { skill: "UI/UX Design", level: 85, category: "Design" },
        { skill: "GraphQL & REST", level: 87, category: "API" }
      ],
      experience: [
        {
          position: "Senior Frontend Developer",
          company: "TechFlow Inc.",
          period: "2022 - Present",
          description: [
            "Led frontend development for a SaaS platform serving 500K+ users",
            "Architected and implemented a design system used across 12 products",
            "Mentored 4 junior developers and conducted code reviews"
          ],
          achievements: [
            "Improved page load speed by 60% through optimization",
            "Increased user engagement by 35% with new UI/UX"
          ]
        },
        {
          position: "Frontend Developer",
          company: "WebCraft Studios",
          period: "2020 - 2022",
          description: [
            "Built responsive web applications for Fortune 500 clients",
            "Collaborated with design teams to implement pixel-perfect interfaces",
            "Integrated third-party APIs and payment systems"
          ],
          achievements: [
            "Delivered 15+ projects on time and under budget",
            "Reduced bug reports by 40% through testing implementation"
          ]
        }
      ],
      education: {
        degree: "BS in Computer Science",
        school: "Stanford University",
        period: "2016 - 2020",
        gpa: "3.9/4.0",
        honors: "Magna Cum Laude"
      },
      projects: [
        {
          name: "E-commerce Platform",
          description: "Full-stack e-commerce solution with React and Node.js",
          tech: ["React", "Node.js", "PostgreSQL", "Stripe"]
        },
        {
          name: "Task Management App",
          description: "Collaborative project management tool with real-time updates",
          tech: ["Next.js", "Socket.io", "MongoDB", "Tailwind"]
        }
      ],
      color: {
        primary: "from-rose-500 to-pink-600",
        secondary: "rose-500",
        accent: "pink-500",
        bg: "rose-50"
      },
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Full Stack Engineer",
      email: "michael.chen@email.com",
      phone: "+1 (555) 345-6789",
      location: "San Francisco, CA",
      summary: "Versatile full-stack engineer with expertise in scalable web applications and cloud architecture. Passionate about clean code and system optimization.",
      skills: [
        { skill: "Node.js & Express", level: 94, category: "Backend" },
        { skill: "React & Vue.js", level: 90, category: "Frontend" },
        { skill: "PostgreSQL & MongoDB", level: 88, category: "Database" },
        { skill: "AWS & Docker", level: 92, category: "DevOps" },
        { skill: "Python & Go", level: 85, category: "Language" },
        { skill: "Microservices", level: 89, category: "Architecture" }
      ],
      experience: [
        {
          position: "Senior Full Stack Engineer",
          company: "CloudTech Solutions",
          period: "2021 - Present",
          description: [
            "Architected microservices handling 1M+ daily active users",
            "Built CI/CD pipelines reducing deployment time by 60%",
            "Led backend optimization initiatives across 8 services"
          ],
          achievements: [
            "Reduced server costs by 45% through optimization",
            "Achieved 99.9% uptime across all services"
          ]
        },
        {
          position: "Backend Developer",
          company: "DataFlow Systems",
          period: "2019 - 2021",
          description: [
            "Developed RESTful APIs serving mobile and web applications",
            "Implemented caching strategies improving response times",
            "Maintained database schemas and optimized queries"
          ],
          achievements: [
            "Improved API response time by 70%",
            "Reduced database query time by 50%"
          ]
        }
      ],
      education: {
        degree: "MS in Software Engineering",
        school: "UC Berkeley",
        period: "2017 - 2019",
        gpa: "3.8/4.0",
        honors: "Dean's List"
      },
      projects: [
        {
          name: "Real-time Analytics Dashboard",
          description: "Live data visualization platform for business metrics",
          tech: ["React", "Node.js", "Redis", "D3.js"]
        },
        {
          name: "Microservices Architecture",
          description: "Scalable backend system with Docker and Kubernetes",
          tech: ["Docker", "Kubernetes", "Go", "PostgreSQL"]
        }
      ],
      color: {
        primary: "from-blue-500 to-cyan-600",
        secondary: "blue-500",
        accent: "cyan-500",
        bg: "blue-50"
      },
      avatar: "MC"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "DevOps Engineer",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      summary: "Experienced DevOps engineer specializing in cloud infrastructure and automation. Expert in building scalable, secure, and cost-effective solutions.",
      skills: [
        { skill: "Kubernetes & Docker", level: 96, category: "Container" },
        { skill: "AWS & Azure", level: 93, category: "Cloud" },
        { skill: "Terraform & Ansible", level: 91, category: "IaC" },
        { skill: "Python & Bash", level: 87, category: "Scripting" },
        { skill: "Jenkins & GitLab CI", level: 89, category: "CI/CD" },
        { skill: "Monitoring & Logging", level: 88, category: "Observability" }
      ],
      experience: [
        {
          position: "Senior DevOps Engineer",
          company: "ScaleOps Inc.",
          period: "2020 - Present",
          description: [
            "Managed cloud infrastructure supporting 2M+ users",
            "Automated deployment processes reducing manual work by 80%",
            "Implemented monitoring solutions across 50+ services"
          ],
          achievements: [
            "Reduced infrastructure costs by 35%",
            "Achieved zero-downtime deployments"
          ]
        },
        {
          position: "Cloud Engineer",
          company: "InfraCloud",
          period: "2018 - 2020",
          description: [
            "Migrated legacy systems to cloud-native architecture",
            "Implemented security best practices and compliance",
            "Optimized resource utilization and cost management"
          ],
          achievements: [
            "Completed 20+ cloud migrations successfully",
            "Improved system reliability by 90%"
          ]
        }
      ],
      education: {
        degree: "BS in Information Systems",
        school: "UT Austin",
        period: "2014 - 2018",
        gpa: "3.7/4.0",
        honors: "Summa Cum Laude"
      },
      projects: [
        {
          name: "Multi-Cloud Infrastructure",
          description: "Hybrid cloud setup with automated failover and scaling",
          tech: ["Terraform", "Kubernetes", "AWS", "Azure"]
        },
        {
          name: "CI/CD Pipeline Automation",
          description: "End-to-end deployment automation for microservices",
          tech: ["Jenkins", "Docker", "Helm", "ArgoCD"]
        }
      ],
      color: {
        primary: "from-emerald-500 to-green-600",
        secondary: "emerald-500",
        accent: "green-500",
        bg: "emerald-50"
      },
      avatar: "ER"
    },
    {
      id: 4,
      name: "David Kim",
      title: "Senior Data Scientist",
      email: "david.kim@email.com",
      phone: "+1 (555) 567-8901",
      location: "Seattle, WA",
      summary: "Data scientist with PhD in Machine Learning and 6+ years of experience building AI solutions. Specialized in deep learning and predictive analytics.",
      skills: [
        { skill: "Python & R", level: 97, category: "Language" },
        { skill: "TensorFlow & PyTorch", level: 94, category: "ML Framework" },
        { skill: "SQL & NoSQL", level: 90, category: "Database" },
        { skill: "Statistics & Math", level: 95, category: "Theory" },
        { skill: "Data Visualization", level: 88, category: "Visualization" },
        { skill: "MLOps & Deployment", level: 86, category: "Operations" }
      ],
      experience: [
        {
          position: "Senior Data Scientist",
          company: "AI Innovations",
          period: "2021 - Present",
          description: [
            "Built ML models improving prediction accuracy by 25%",
            "Led data science team of 6 researchers and engineers",
            "Architected data pipelines processing 10TB+ daily"
          ],
          achievements: [
            "Published 8 research papers in top-tier conferences",
            "Generated $2M+ revenue through ML solutions"
          ]
        },
        {
          position: "Data Scientist",
          company: "Analytics Pro",
          period: "2019 - 2021",
          description: [
            "Developed predictive models for customer behavior",
            "Created automated reporting systems for stakeholders",
            "Analyzed large datasets to extract business insights"
          ],
          achievements: [
            "Improved customer retention by 30%",
            "Reduced analysis time by 75% through automation"
          ]
        }
      ],
      education: {
        degree: "PhD in Data Science",
        school: "University of Washington",
        period: "2015 - 2019",
        gpa: "3.9/4.0",
        honors: "Outstanding Dissertation Award"
      },
      projects: [
        {
          name: "Computer Vision Platform",
          description: "Real-time object detection and classification system",
          tech: ["PyTorch", "OpenCV", "FastAPI", "Docker"]
        },
        {
          name: "Recommendation Engine",
          description: "Personalized content recommendation using deep learning",
          tech: ["TensorFlow", "Spark", "Kafka", "Redis"]
        }
      ],
      color: {
        primary: "from-purple-500 to-indigo-600",
        secondary: "purple-500",
        accent: "indigo-500",
        bg: "purple-50"
      },
      avatar: "DK"
    }
  ];

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setAnimationTime(prev => prev + 0.02);
      
      setRotationX(prev => {
        // Gentle wobble on X-axis (up/down tilt)
        const wobble = Math.sin(animationTime * 0.8) * 8;
        return wobble;
      });

      setRotationY(prev => {
        const newRotation = prev + 1.2; // Main rotation axis
        
        // Change resume every 180 degrees (when card flips)
        if (Math.floor(newRotation / 180) !== Math.floor(prev / 180)) {
          setCurrentResumeIndex(prevIndex => (prevIndex + 1) % resumes.length);
        }
        
        return newRotation % 360;
      });

      setRotationZ(prev => {
        // Subtle roll effect
        const roll = Math.sin(animationTime * 0.6) * 4;
        return roll;
      });
    }, 16); // 60fps for smooth animation

    return () => clearInterval(interval);
  }, [resumes.length, isAnimating, animationTime]);

  // Get the current front and back resume indices
  const frontResumeIndex = currentResumeIndex;
  const backResumeIndex = (currentResumeIndex + 1) % resumes.length;
  
  const frontResume = resumes[frontResumeIndex];
  const backResume = resumes[backResumeIndex];

  // Function to handle navigation to /resumejob
  const handleGetStartedClick = () => {
    window.location.href = '/resumejobs';
  };

  // Removed type annotation for resume prop
  const ResumeCard = ({ resume }) => (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 h-full transform hover:scale-[1.02] transition-transform duration-300">
      {/* Header Section */}
      <div className={`bg-gradient-to-br ${resume.color.primary} p-8 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10 flex items-start space-x-6">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
            <span className="text-2xl font-bold text-white">{resume.avatar}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{resume.name}</h2>
            <p className="text-xl opacity-90 mb-4">{resume.title}</p>
            <div className="grid grid-cols-1 gap-2 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>{resume.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} />
                <span>{resume.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8 h-[calc(100%-200px)] overflow-y-auto">
        {/* Summary */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <User className="mr-2 text-gray-600" size={18} />
            Professional Summary
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{resume.summary}</p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Code className="mr-2 text-gray-600" size={18} />
            Technical Skills
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {resume.skills.slice(0, 6).map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.category}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${resume.color.primary} h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${item.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Briefcase className="mr-2 text-gray-600" size={18} />
            Work Experience
          </h3>
          <div className="space-y-6">
            {resume.experience.slice(0, 2).map((exp, index) => (
              <div key={index} className="relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div> {/* Hardcoded gradient for timeline */}
                <div className="pl-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{exp.position}</h4>
                      <p className={`text-${resume.color.secondary} font-medium text-sm flex items-center`}>
                        <Building size={14} className="mr-1" />
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {exp.period}
                    </span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1 mb-3">
                    {exp.description.slice(0, 2).map((desc, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                  {exp.achievements.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Award size={12} className={`text-${resume.color.accent}`} />
                      <span className="text-xs text-gray-500">{exp.achievements[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <GraduationCap className="mr-2 text-gray-600" size={18} />
            Education
          </h3>
          <div className={`bg-${resume.color.bg} p-4 rounded-xl border-l-4 border-${resume.color.secondary}`}>
            <h4 className="font-semibold text-gray-800">{resume.education.degree}</h4>
            <p className={`text-${resume.color.secondary} font-medium text-sm`}>{resume.education.school}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-600">{resume.education.period}</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-600">GPA: {resume.education.gpa}</span>
                {resume.education.honors && (
                  <span className={`text-xs bg-${resume.color.secondary} text-white px-2 py-1 rounded-full`}>
                    {resume.education.honors}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <Globe className="mr-2 text-gray-600" size={18} />
            Key Projects
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {resume.projects.slice(0, 2).map((project, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-1">{project.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, i) => (
                    <span key={i} className={`text-xs bg-${resume.color.secondary} text-white px-2 py-1 rounded-full`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br opacity-100 from-slate-50 via-blue-50 to-indigo-100 flex items-center overflow-hidden relative p-9">
      {/* Enhanced background with depth */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400 rounded-full blur-2xl opacity-15 animate-pulse delay-500"></div>
      </div>

      {/* Left Side - AgenticHireX Branding */}
      <div className="w-1/2 flex items-center justify-center relative z-10 px-12">
        <div className="text-center max-w-lg">
          <div className="mb-8">
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-4 tracking-tight leading-tight">
              AgenticHireX
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-2xl text-gray-700 font-light mb-2">
              AI-Powered Talent Discovery
            </p>
            <p className="text-lg text-gray-500 mb-8">
              Revolutionizing recruitment with intelligent matching
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3 text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Smart candidate screening</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">Automated skill assessment</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-sm">Perfect job matching</span>
            </div>
          </div>

          {/* Get Started Button */}
          <button
            onClick={handleGetStartedClick}
            className="mt-12 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </button>

          <div className="mt-12 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Double-Sided 3D Rotating Resume Showcase */}
      <div className="w-1/2 flex items-center justify-center relative z-10 p-12">
        <div className="relative w-full max-w-2xl h-[700px]" style={{ perspective: '1200px' }}>
          {/* Resume Container with Realistic 3D Rotation */}
          <div 
            className="w-full h-full relative cursor-pointer"
            style={{
              transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'none', // Managed by JS interval, not CSS transition
              filter: `drop-shadow(${Math.sin(rotationY * Math.PI / 180) * 20}px ${Math.sin(rotationX * Math.PI / 180) * 10}px 30px rgba(0,0,0,0.3))`
            }}
            onMouseEnter={() => setIsAnimating(false)}
            onMouseLeave={() => setIsAnimating(true)}
          >
            {/* Front Face - Current Resume */}
            <div 
              className="absolute inset-0"
              style={{
                transform: 'translateZ(4px)',
                backfaceVisibility: 'hidden'
              }}
            >
              <ResumeCard resume={frontResume} />
            </div>

            {/* Back Face - Next Resume (Different Content) */}
            <div 
              className="absolute inset-0"
              style={{
                transform: 'rotateY(180deg) translateZ(4px)',
                backfaceVisibility: 'hidden'
              }}
            >
              <ResumeCard resume={backResume} />
            </div>
          </div>

          {/* Enhanced Resume Navigation Dots */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {resumes.map((resume, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentResumeIndex(index);
                  setRotationY(0); // Reset rotation when manually selecting
                }}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentResumeIndex 
                    ? `bg-gradient-to-r ${frontResume.color.primary} shadow-lg scale-110 ring-2 ring-white ring-opacity-50` 
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-105'
                }`}
              />
            ))}
          </div>

          {/* Resume Counter */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-sm text-gray-500">
              Resume {currentResumeIndex + 1} of {resumes.length}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Action Elements */}
      <div className="absolute top-8 right-8 flex space-x-2">
        <button 
          onClick={() => setIsAnimating(!isAnimating)}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-gray-800 hover:scale-110"
        >
          {isAnimating ? (
            <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <div className="w-4 h-4 bg-gray-600 rounded-sm"></div>
          )}
        </button>
      </div>

      {/* Enhanced Bottom Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <p className="text-sm text-gray-500 mb-2">
          Hover to pause • Click dots to navigate • Experience realistic 3D rotation
        </p>
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
          <Star size={12} className="text-yellow-400" />
          <span>Premium 3D talent showcase</span>
          <Star size={12} className="text-yellow-400" />
        </div>
      </div>

      {/* 3D Depth Indicators */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-400 space-y-1">
        <div>X: {Math.round(rotationX)}°</div>
        <div>Y: {Math.round(rotationY)}°</div>
        <div>Z: {Math.round(rotationZ)}°</div>
      </div>
    </div>
  );
}

export default App;























// import React, { useState, useEffect } from 'react';
// import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Globe, Github, Linkedin, Award, Star, Calendar, Building } from 'lucide-react';

// // Removed the 'interface Resume' definition as it's TypeScript specific.

// function App() {
//   const [currentResumeIndex, setCurrentResumeIndex] = useState(0);
//   const [rotationX, setRotationX] = useState(0);
//   const [rotationY, setRotationY] = useState(0);
//   const [rotationZ, setRotationZ] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(true);
//   const [animationTime, setAnimationTime] = useState(0);

//   // The 'resumes' array is now a regular JavaScript array, no type annotation needed.
//   const resumes = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       title: "Senior Frontend Developer",
//       email: "sarah.johnson@email.com",
//       phone: "+1 (555) 234-5678",
//       location: "New York, NY",
//       summary: "Passionate frontend developer with 5+ years of experience creating exceptional user experiences. Specialized in React ecosystem and modern web technologies.",
//       skills: [
//         { skill: "React & TypeScript", level: 95, category: "Frontend" },
//         { skill: "Next.js & Gatsby", level: 90, category: "Framework" },
//         { skill: "CSS & Tailwind", level: 92, category: "Styling" },
//         { skill: "JavaScript ES6+", level: 88, category: "Language" },
//         { skill: "UI/UX Design", level: 85, category: "Design" },
//         { skill: "GraphQL & REST", level: 87, category: "API" }
//       ],
//       experience: [
//         {
//           position: "Senior Frontend Developer",
//           company: "TechFlow Inc.",
//           period: "2022 - Present",
//           description: [
//             "Led frontend development for a SaaS platform serving 500K+ users",
//             "Architected and implemented a design system used across 12 products",
//             "Mentored 4 junior developers and conducted code reviews"
//           ],
//           achievements: [
//             "Improved page load speed by 60% through optimization",
//             "Increased user engagement by 35% with new UI/UX"
//           ]
//         },
//         {
//           position: "Frontend Developer",
//           company: "WebCraft Studios",
//           period: "2020 - 2022",
//           description: [
//             "Built responsive web applications for Fortune 500 clients",
//             "Collaborated with design teams to implement pixel-perfect interfaces",
//             "Integrated third-party APIs and payment systems"
//           ],
//           achievements: [
//             "Delivered 15+ projects on time and under budget",
//             "Reduced bug reports by 40% through testing implementation"
//           ]
//         }
//       ],
//       education: {
//         degree: "BS in Computer Science",
//         school: "Stanford University",
//         period: "2016 - 2020",
//         gpa: "3.9/4.0",
//         honors: "Magna Cum Laude"
//       },
//       projects: [
//         {
//           name: "E-commerce Platform",
//           description: "Full-stack e-commerce solution with React and Node.js",
//           tech: ["React", "Node.js", "PostgreSQL", "Stripe"]
//         },
//         {
//           name: "Task Management App",
//           description: "Collaborative project management tool with real-time updates",
//           tech: ["Next.js", "Socket.io", "MongoDB", "Tailwind"]
//         }
//       ],
//       color: {
//         primary: "from-rose-500 to-pink-600",
//         secondary: "rose-500",
//         accent: "pink-500",
//         bg: "rose-50"
//       },
//       avatar: "SJ"
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       title: "Full Stack Engineer",
//       email: "michael.chen@email.com",
//       phone: "+1 (555) 345-6789",
//       location: "San Francisco, CA",
//       summary: "Versatile full-stack engineer with expertise in scalable web applications and cloud architecture. Passionate about clean code and system optimization.",
//       skills: [
//         { skill: "Node.js & Express", level: 94, category: "Backend" },
//         { skill: "React & Vue.js", level: 90, category: "Frontend" },
//         { skill: "PostgreSQL & MongoDB", level: 88, category: "Database" },
//         { skill: "AWS & Docker", level: 92, category: "DevOps" },
//         { skill: "Python & Go", level: 85, category: "Language" },
//         { skill: "Microservices", level: 89, category: "Architecture" }
//       ],
//       experience: [
//         {
//           position: "Senior Full Stack Engineer",
//           company: "CloudTech Solutions",
//           period: "2021 - Present",
//           description: [
//             "Architected microservices handling 1M+ daily active users",
//             "Built CI/CD pipelines reducing deployment time by 60%",
//             "Led backend optimization initiatives across 8 services"
//           ],
//           achievements: [
//             "Reduced server costs by 45% through optimization",
//             "Achieved 99.9% uptime across all services"
//           ]
//         },
//         {
//           position: "Backend Developer",
//           company: "DataFlow Systems",
//           period: "2019 - 2021",
//           description: [
//             "Developed RESTful APIs serving mobile and web applications",
//             "Implemented caching strategies improving response times",
//             "Maintained database schemas and optimized queries"
//           ],
//           achievements: [
//             "Improved API response time by 70%",
//             "Reduced database query time by 50%"
//           ]
//         }
//       ],
//       education: {
//         degree: "MS in Software Engineering",
//         school: "UC Berkeley",
//         period: "2017 - 2019",
//         gpa: "3.8/4.0",
//         honors: "Dean's List"
//       },
//       projects: [
//         {
//           name: "Real-time Analytics Dashboard",
//           description: "Live data visualization platform for business metrics",
//           tech: ["React", "Node.js", "Redis", "D3.js"]
//         },
//         {
//           name: "Microservices Architecture",
//           description: "Scalable backend system with Docker and Kubernetes",
//           tech: ["Docker", "Kubernetes", "Go", "PostgreSQL"]
//         }
//       ],
//       color: {
//         primary: "from-blue-500 to-cyan-600",
//         secondary: "blue-500",
//         accent: "cyan-500",
//         bg: "blue-50"
//       },
//       avatar: "MC"
//     },
//     {
//       id: 3,
//       name: "Emily Rodriguez",
//       title: "DevOps Engineer",
//       email: "emily.rodriguez@email.com",
//       phone: "+1 (555) 456-7890",
//       location: "Austin, TX",
//       summary: "Experienced DevOps engineer specializing in cloud infrastructure and automation. Expert in building scalable, secure, and cost-effective solutions.",
//       skills: [
//         { skill: "Kubernetes & Docker", level: 96, category: "Container" },
//         { skill: "AWS & Azure", level: 93, category: "Cloud" },
//         { skill: "Terraform & Ansible", level: 91, category: "IaC" },
//         { skill: "Python & Bash", level: 87, category: "Scripting" },
//         { skill: "Jenkins & GitLab CI", level: 89, category: "CI/CD" },
//         { skill: "Monitoring & Logging", level: 88, category: "Observability" }
//       ],
//       experience: [
//         {
//           position: "Senior DevOps Engineer",
//           company: "ScaleOps Inc.",
//           period: "2020 - Present",
//           description: [
//             "Managed cloud infrastructure supporting 2M+ users",
//             "Automated deployment processes reducing manual work by 80%",
//             "Implemented monitoring solutions across 50+ services"
//           ],
//           achievements: [
//             "Reduced infrastructure costs by 35%",
//             "Achieved zero-downtime deployments"
//           ]
//         },
//         {
//           position: "Cloud Engineer",
//           company: "InfraCloud",
//           period: "2018 - 2020",
//           description: [
//             "Migrated legacy systems to cloud-native architecture",
//             "Implemented security best practices and compliance",
//             "Optimized resource utilization and cost management"
//           ],
//           achievements: [
//             "Completed 20+ cloud migrations successfully",
//             "Improved system reliability by 90%"
//           ]
//         }
//       ],
//       education: {
//         degree: "BS in Information Systems",
//         school: "UT Austin",
//         period: "2014 - 2018",
//         gpa: "3.7/4.0",
//         honors: "Summa Cum Laude"
//       },
//       projects: [
//         {
//           name: "Multi-Cloud Infrastructure",
//           description: "Hybrid cloud setup with automated failover and scaling",
//           tech: ["Terraform", "Kubernetes", "AWS", "Azure"]
//         },
//         {
//           name: "CI/CD Pipeline Automation",
//           description: "End-to-end deployment automation for microservices",
//           tech: ["Jenkins", "Docker", "Helm", "ArgoCD"]
//         }
//       ],
//       color: {
//         primary: "from-emerald-500 to-green-600",
//         secondary: "emerald-500",
//         accent: "green-500",
//         bg: "emerald-50"
//       },
//       avatar: "ER"
//     },
//     {
//       id: 4,
//       name: "David Kim",
//       title: "Senior Data Scientist",
//       email: "david.kim@email.com",
//       phone: "+1 (555) 567-8901",
//       location: "Seattle, WA",
//       summary: "Data scientist with PhD in Machine Learning and 6+ years of experience building AI solutions. Specialized in deep learning and predictive analytics.",
//       skills: [
//         { skill: "Python & R", level: 97, category: "Language" },
//         { skill: "TensorFlow & PyTorch", level: 94, category: "ML Framework" },
//         { skill: "SQL & NoSQL", level: 90, category: "Database" },
//         { skill: "Statistics & Math", level: 95, category: "Theory" },
//         { skill: "Data Visualization", level: 88, category: "Visualization" },
//         { skill: "MLOps & Deployment", level: 86, category: "Operations" }
//       ],
//       experience: [
//         {
//           position: "Senior Data Scientist",
//           company: "AI Innovations",
//           period: "2021 - Present",
//           description: [
//             "Built ML models improving prediction accuracy by 25%",
//             "Led data science team of 6 researchers and engineers",
//             "Architected data pipelines processing 10TB+ daily"
//           ],
//           achievements: [
//             "Published 8 research papers in top-tier conferences",
//             "Generated $2M+ revenue through ML solutions"
//           ]
//         },
//         {
//           position: "Data Scientist",
//           company: "Analytics Pro",
//           period: "2019 - 2021",
//           description: [
//             "Developed predictive models for customer behavior",
//             "Created automated reporting systems for stakeholders",
//             "Analyzed large datasets to extract business insights"
//           ],
//           achievements: [
//             "Improved customer retention by 30%",
//             "Reduced analysis time by 75% through automation"
//           ]
//         }
//       ],
//       education: {
//         degree: "PhD in Data Science",
//         school: "University of Washington",
//         period: "2015 - 2019",
//         gpa: "3.9/4.0",
//         honors: "Outstanding Dissertation Award"
//       },
//       projects: [
//         {
//           name: "Computer Vision Platform",
//           description: "Real-time object detection and classification system",
//           tech: ["PyTorch", "OpenCV", "FastAPI", "Docker"]
//         },
//         {
//           name: "Recommendation Engine",
//           description: "Personalized content recommendation using deep learning",
//           tech: ["TensorFlow", "Spark", "Kafka", "Redis"]
//         }
//       ],
//       color: {
//         primary: "from-purple-500 to-indigo-600",
//         secondary: "purple-500",
//         accent: "indigo-500",
//         bg: "purple-50"
//       },
//       avatar: "DK"
//     }
//   ];

//   useEffect(() => {
//     if (!isAnimating) return;

//     const interval = setInterval(() => {
//       setAnimationTime(prev => prev + 0.02);
      
//       setRotationX(prev => {
//         // Gentle wobble on X-axis (up/down tilt)
//         const wobble = Math.sin(animationTime * 0.8) * 8;
//         return wobble;
//       });

//       setRotationY(prev => {
//         const newRotation = prev + 1.2; // Main rotation axis
        
//         // Change resume every 180 degrees (when card flips)
//         if (Math.floor(newRotation / 270) !== Math.floor(prev / 270)) {
//           setCurrentResumeIndex(prevIndex => (prevIndex + 1) % resumes.length);
//         }
        
//         return newRotation % 360;
//       });

//       setRotationZ(prev => {
//         // Subtle roll effect
//         const roll = Math.sin(animationTime * 0.6) * 4;
//         return roll;
//       });
//     }, 16); // 60fps for smooth animation

//     return () => clearInterval(interval);
//   }, [resumes.length, isAnimating, animationTime]);

//   // Get the current front and back resume indices
//   const frontResumeIndex = currentResumeIndex;
//   const backResumeIndex = (currentResumeIndex + 1) % resumes.length;
  
//   const frontResume = resumes[frontResumeIndex];
//   const backResume = resumes[backResumeIndex];

//   // Removed type annotation for resume prop
//   const ResumeCard = ({ resume }) => (
//     <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 h-full transform hover:scale-[1.02] transition-transform duration-300">
//       {/* Header Section */}
//       <div className={`bg-gradient-to-br ${resume.color.primary} p-8 text-white relative overflow-hidden`}>
//         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
//         <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
//         <div className="relative z-10 flex items-start space-x-6">
//           <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
//             <span className="text-2xl font-bold text-white">{resume.avatar}</span>
//           </div>
//           <div className="flex-1">
//             <h2 className="text-3xl font-bold mb-2">{resume.name}</h2>
//             <p className="text-xl opacity-90 mb-4">{resume.title}</p>
//             <div className="grid grid-cols-1 gap-2 text-sm opacity-80">
//               <div className="flex items-center space-x-2">
//                 <Mail size={14} />
//                 <span>{resume.email}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <MapPin size={14} />
//                 <span>{resume.location}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-8 space-y-8 h-[calc(100%-200px)] overflow-y-auto">
//         {/* Summary */}
//         <div>
//           <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
//             <User className="mr-2 text-gray-600" size={18} />
//             Professional Summary
//           </h3>
//           <p className="text-gray-600 text-sm leading-relaxed">{resume.summary}</p>
//         </div>

//         {/* Skills */}
//         <div>
//           <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
//             <Code className="mr-2 text-gray-600" size={18} />
//             Technical Skills
//           </h3>
//           <div className="grid grid-cols-2 gap-4">
//             {resume.skills.slice(0, 6).map((item, index) => (
//               <div key={index} className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm font-medium text-gray-700">{item.skill}</span>
//                   <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.category}</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className={`bg-gradient-to-r ${resume.color.primary} h-2 rounded-full transition-all duration-1000 ease-out`}
//                     style={{ width: `${item.level}%` }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Experience */}
//         <div>
//           <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
//             <Briefcase className="mr-2 text-gray-600" size={18} />
//             Work Experience
//           </h3>
//           <div className="space-y-6">
//             {resume.experience.slice(0, 2).map((exp, index) => (
//               <div key={index} className="relative">
//                 <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div> {/* Hardcoded gradient for timeline */}
//                 <div className="pl-6">
//                   <div className="flex items-start justify-between mb-2">
//                     <div>
//                       <h4 className="font-semibold text-gray-800">{exp.position}</h4>
//                       <p className={`text-${resume.color.secondary} font-medium text-sm flex items-center`}>
//                         <Building size={14} className="mr-1" />
//                         {exp.company}
//                       </p>
//                     </div>
//                     <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex items-center">
//                       <Calendar size={12} className="mr-1" />
//                       {exp.period}
//                     </span>
//                   </div>
//                   <ul className="text-xs text-gray-600 space-y-1 mb-3">
//                     {exp.description.slice(0, 2).map((desc, i) => (
//                       <li key={i} className="flex items-start">
//                         <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
//                         {desc}
//                       </li>
//                     ))}
//                   </ul>
//                   {exp.achievements.length > 0 && (
//                     <div className="flex items-center space-x-2">
//                       <Award size={12} className={`text-${resume.color.accent}`} />
//                       <span className="text-xs text-gray-500">{exp.achievements[0]}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Education */}
//         <div>
//           <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
//             <GraduationCap className="mr-2 text-gray-600" size={18} />
//             Education
//           </h3>
//           <div className={`bg-${resume.color.bg} p-4 rounded-xl border-l-4 border-${resume.color.secondary}`}>
//             <h4 className="font-semibold text-gray-800">{resume.education.degree}</h4>
//             <p className={`text-${resume.color.secondary} font-medium text-sm`}>{resume.education.school}</p>
//             <div className="flex items-center justify-between mt-2">
//               <span className="text-xs text-gray-600">{resume.education.period}</span>
//               <div className="flex items-center space-x-2">
//                 <span className="text-xs text-gray-600">GPA: {resume.education.gpa}</span>
//                 {resume.education.honors && (
//                   <span className={`text-xs bg-${resume.color.secondary} text-white px-2 py-1 rounded-full`}>
//                     {resume.education.honors}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Projects */}
//         <div>
//           <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
//             <Globe className="mr-2 text-gray-600" size={18} />
//             Key Projects
//           </h3>
//           <div className="grid grid-cols-1 gap-3">
//             {resume.projects.slice(0, 2).map((project, index) => (
//               <div key={index} className="bg-gray-50 p-4 rounded-xl">
//                 <h4 className="font-semibold text-gray-800 mb-1">{project.name}</h4>
//                 <p className="text-xs text-gray-600 mb-2">{project.description}</p>
//                 <div className="flex flex-wrap gap-1">
//                   {project.tech.map((tech, i) => (
//                     <span key={i} className={`text-xs bg-${resume.color.secondary} text-white px-2 py-1 rounded-full`}>
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br opacity-100 from-slate-50 via-blue-50 to-indigo-100 flex items-center overflow-hidden relative p-9">
//       {/* Enhanced background with depth */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400 rounded-full blur-2xl opacity-15 animate-pulse delay-500"></div>
//       </div>

//       {/* Left Side - AgenticHireX Branding */}
//       <div className="w-1/2 flex items-center justify-center relative z-10 px-12">
//         <div className="text-center max-w-lg">
//           <div className="mb-8">
//             <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-4 tracking-tight leading-tight">
//               AgenticHireX
//             </h1>
//             <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
//             <p className="text-2xl text-gray-700 font-light mb-2">
//               AI-Powered Talent Discovery
//             </p>
//             <p className="text-lg text-gray-500 mb-8">
//               Revolutionizing recruitment with intelligent matching
//             </p>
//           </div>

//           <div className="space-y-4 text-left">
//             <div className="flex items-center space-x-3 text-gray-600">
//               <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//               <span className="text-sm">Smart candidate screening</span>
//             </div>
//             <div className="flex items-center space-x-3 text-gray-600">
//               <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//               <span className="text-sm">Automated skill assessment</span>
//             </div>
//             <div className="flex items-center space-x-3 text-gray-600">
//               <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
//               <span className="text-sm">Perfect job matching</span>
//             </div>
//           </div>

//           <div className="mt-12 flex justify-center space-x-2">
//             <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
//             <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-100"></div>
//             <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Double-Sided 3D Rotating Resume Showcase */}
//       <div className="w-1/2 flex items-center justify-center relative z-10 p-12">
//         <div className="relative w-full max-w-2xl h-[700px]" style={{ perspective: '1200px' }}>
//           {/* Resume Container with Realistic 3D Rotation */}
//           <div 
//             className="w-full h-full relative cursor-pointer"
//             style={{
//               transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
//               transformStyle: 'preserve-3d',
//               transition: 'none', // Managed by JS interval, not CSS transition
//               filter: `drop-shadow(${Math.sin(rotationY * Math.PI / 180) * 20}px ${Math.sin(rotationX * Math.PI / 180) * 10}px 30px rgba(0,0,0,0.3))`
//             }}
//             onMouseEnter={() => setIsAnimating(false)}
//             onMouseLeave={() => setIsAnimating(true)}
//           >
//             {/* Front Face - Current Resume */}
//             <div 
//               className="absolute inset-0"
//               style={{
//                 transform: 'translateZ(4px)',
//                 backfaceVisibility: 'hidden'
//               }}
//             >
//               <ResumeCard resume={frontResume} />
//             </div>

//             {/* Back Face - Next Resume (Different Content) */}
//             <div 
//               className="absolute inset-0"
//               style={{
//                 transform: 'rotateY(180deg) translateZ(4px)',
//                 backfaceVisibility: 'hidden'
//               }}
//             >
//               <ResumeCard resume={backResume} />
//             </div>
//           </div>

//           {/* Enhanced Resume Navigation Dots */}
//           <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-3">
//             {resumes.map((resume, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setCurrentResumeIndex(index);
//                   setRotationY(0); // Reset rotation when manually selecting
//                 }}
//                 className={`w-4 h-4 rounded-full transition-all duration-300 ${
//                   index === currentResumeIndex 
//                     ? `bg-gradient-to-r ${frontResume.color.primary} shadow-lg scale-110 ring-2 ring-white ring-opacity-50` 
//                     : 'bg-gray-300 hover:bg-gray-400 hover:scale-105'
//                 }`}
//               />
//             ))}
//           </div>

//           {/* Resume Counter */}
//           <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
//             <p className="text-sm text-gray-500">
//               Resume {currentResumeIndex + 1} of {resumes.length}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Floating Action Elements */}
//       <div className="absolute top-8 right-8 flex space-x-2">
//         <button 
//           onClick={() => setIsAnimating(!isAnimating)}
//           className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-gray-800 hover:scale-110"
//         >
//           {isAnimating ? (
//             <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
//           ) : (
//             <div className="w-4 h-4 bg-gray-600 rounded-sm"></div>
//           )}
//         </button>
//       </div>

    

//       {/* 3D Depth Indicators */}
//       <div className="absolute bottom-4 right-4 text-xs text-gray-400 space-y-1">
//         <div>X: {Math.round(rotationX)}°</div>
//         <div>Y: {Math.round(rotationY)}°</div>
//         <div>Z: {Math.round(rotationZ)}°</div>
//       </div>
//     </div>
//   );
// }

// export default App;
