import React, { useRef } from "react";
import "../components/animated_Resume_css_code.css";

const Resume1 = require("../Assests/Resume1.jpg");
const Resume2 = require("../Assests/Resume2.jpg");
const Resume3 = require("../Assests/Resume3.jpg");
const Resume4 = require("../Assests/Resume4.jpg");

const AnimatedResume = () => {
  const containerRef = useRef(null);

  return (
    <div className="resume-container" ref={containerRef}>
      <div className="flip-content object-fill shadow-cyan-500/50  object-cover m-0">
        <div className="front  object-cover">
          <img
            src={Resume1}
            alt="Resume 1"
            className="resume-slide resume-1"
            loading="lazy"
          />
          <img
            src={Resume3}
            alt="Resume 3"
            className="resume-slide resume-3"
            loading="lazy"
          />
        </div>

        <div className="back">
          <div className="resume-2">
            <img src={Resume2} alt="Resume 2" loading="lazy" />
          </div>
          <div className="resume-4">
            <img src={Resume4} alt="Resume 4" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AnimatedResume);