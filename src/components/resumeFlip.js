import React, { useState, useEffect, useRef } from 'react';
import '../../src/resumeFliper.css'; // Extracted CSS is assumed here

const ResumeFlipper = () => {
  const [currentResume, setCurrentResume] = useState(0);
  const [rotateAngle, setRotateAngle] = useState(0);
  const flippingRef = useRef(false);
  const requestRef = useRef();
  const startTimeRef = useRef(null);
  const flipDirectionRef = useRef(1);

  const resumes = [
    {
      name: "John Doe",
      title: "Frontend Developer",
      summary: "Experienced in React, JavaScript, and modern web development.",
      skills: [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "HTML/CSS", level: 95 },
        { name: "Node.js", level: 70 },
      ],
      experience: [
        { role: "Senior Developer", company: "Tech Corp", duration: "2018-Present" },
        { role: "Junior Developer", company: "Web Solutions", duration: "2015-2018" }
      ],
      education: "BSc Computer Science, University of Technology"
    },
    {
      name: "Jane Smith",
      title: "UI/UX Designer",
      summary: "Creative designer with 5+ years of experience in user-centered design.",
      skills: [
        { name: "Figma", level: 95 },
        { name: "UI Design", level: 90 },
        { name: "UX Research", level: 80 },
        { name: "Prototyping", level: 85 },
      ],
      experience: [
        { role: "Lead Designer", company: "Design Studio", duration: "2019-Present" },
        { role: "Designer", company: "Creative Agency", duration: "2016-2019" }
      ],
      education: "BFA Design, Art Institute"
    },
    {
      name: "Robert Johnson",
      title: "Backend Engineer",
      summary: "Specialized in building scalable server architectures and databases.",
      skills: [
        { name: "Python", level: 90 },
        { name: "Django", level: 85 },
        { name: "SQL", level: 95 },
        { name: "AWS", level: 80 },
      ],
      experience: [
        { role: "Backend Lead", company: "Data Systems", duration: "2017-Present" },
        { role: "Database Admin", company: "InfoTech", duration: "2014-2017" }
      ],
      education: "MSc Computer Engineering, State University"
    },
    {
      name: "Emily Davis",
      title: "Full Stack Developer",
      summary: "Versatile developer with experience across the full web stack.",
      skills: [
        { name: "React", level: 85 },
        { name: "Node.js", level: 90 },
        { name: "MongoDB", level: 80 },
        { name: "REST APIs", level: 85 },
      ],
      experience: [
        { role: "Full Stack Engineer", company: "WebPlatform Inc", duration: "2018-Present" },
        { role: "Web Developer", company: "Digital Solutions", duration: "2015-2018" }
      ],
      education: "BEng Software Engineering, Tech University"
    }
  ];

  const animateFlip = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
  
    const elapsed = timestamp - startTimeRef.current;
    const duration = 4000; // 4 seconds
    const progress = elapsed / duration;
  
    // Keep the angle going forward (not flipping back)
    const angle = easeInOutSine(progress) * 720;
    setRotateAngle(angle);
  
    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animateFlip);
    } else {
      flippingRef.current = false;
      setRotateAngle(0); // Reset rotation
      startTimeRef.current = null;
      requestRef.current = null;
  
      // Change resume AFTER the complete 720° spin
      setCurrentResume((prev) => (prev + 1) % resumes.length);
    }
  };
  

  const easeInOutSine = t => -(Math.cos(Math.PI * t) - 1) / 2;

  const startFlip = () => {
    if (!flippingRef.current) {
      flippingRef.current = true;
      flipDirectionRef.current *= -1;
      requestRef.current = requestAnimationFrame(animateFlip);
    }
  };

  useEffect(() => {
    const timer = setInterval(startFlip, 4500);
    return () => {
      clearInterval(timer);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const renderResumeSections = resume => (
    <>
      <div className="section">
        <h3>Summary</h3>
        <p>{resume.summary}</p>
      </div>
      <div className="section">
        <h3>Skills</h3>
        {resume.skills.map((skill, i) => (
          <div key={i} className="skill">
            <p>{skill.name}</p>
            <div className="skill-bar">
              <div 
                className="skill-progress"
                style={{
                  width: `${skill.level}%`,
                  animation: 'skillFill 2s forwards ease-out'
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="section">
        <h3>Experience</h3>
        {resume.experience.map((exp, i) => (
          <div key={i}>
            <p><strong>{exp.role}</strong> at {exp.company} ({exp.duration})</p>
          </div>
        ))}
      </div>
      <div className="section">
        <h3>Education</h3>
        <p>{resume.education}</p>
      </div>
    </>
  );

  const renderResume = index => {
    const resume = resumes[index];
    return (
      <>
        <div className="resume-header">
          <h1>{resume.name}</h1>
          <h2>{resume.title}</h2>
        </div>
        <div className="resume-content-container">
          {renderResumeSections(resume)}
        </div>
        <div className="resume-footer">
          <p>Click or wait for next flip</p>
        </div>
      </>
    );
  };

  const getFlipStyle = () => ({
    transform: `rotateY(${rotateAngle}deg)`,
    backfaceVisibility: 'hidden'
  });

  return (
    <div className="container">
      <div className="flipper" style={getFlipStyle()} onClick={startFlip}>
        <div className="resume" style={{ transform: 'rotateY(0deg)' }}>
          {renderResume(currentResume)}
        </div>
        <div className="resume" style={{ transform: 'rotateY(180deg)' }}>
          {renderResume((currentResume + 1) % resumes.length)}
        </div>
      </div>
    </div>
  );
};

export default ResumeFlipper;
