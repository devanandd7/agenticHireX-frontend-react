import React from "react";
import Crousal from "./crousal";
import Contact from "./contact";
import Navbar from "./navbar";
import We from "./we";
import Footer from "./footer";
import Character_2D_intact_cousor from "./try/character_2D_intact_cousor";
import Resume_rotate_intract_mouse from "./try/resume_rotate_intract_mouse";
import Resume_intract_cursor from "./try/resume_intract_cursor";
import Resume_intract_mouse_2 from "./try/resume_intract_mouse_2";
import Team_card from "./try/team_card";
import DrawCircleText from "./drawCircleText";
import How_it_works from "./How_it_works";
import AnimatedResume_abhi from "./animatedResume_abhi";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


import Page_1_human3d from "./page_1_human3d";
// import ResumeFlipper from './resumeFlip';
const home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="App">
        {/* <Page_1_human3d /> */}
        {/* <ResumeFlipper/> */}
        {/* <Character_2D_intact_cousor/> */}
        {/* <Resume_rotate_intract_mouse/> */}
        {/* <Resume_intract_mouse_2/> */}



              <div className="flex-grow flex items-center justify-start p-8 bg-gray-100 dark:bg-white text-gray-900 dark:text-white">
        <div className="max-w-xl text-left">
          <h1 className="text-5xl text-black font-bold mb-4 leading-tight">
            Your Career,{" "}
            <span className="text-indigo-600 dark:text-indigo-400 text-black">
              Simplified.
            </span>
          </h1>
          <p className="text-lg mb-8 opacity-90 text-black">
            AgenticHireX empowers you to craft perfect resumes and land your
            dream job with AI-driven precision.
          </p>
          <Link to="/resumejobs"> {/* Wrap button with Link */} 
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
              Get Started
            </button>
          </Link>
        </div>

         <AnimatedResume_abhi />
      </div>

       
        <DrawCircleText />
        <How_it_works />
        <Crousal />

        {/* <Resume_intract_cursor/> */}
        {/* <Resume_intract_mouse_2/> */}
        {/* <Character_2D_intact_cousor/> */}
        {/* <Resume_rotate_intract_mouse/> */}
        {/* <Resume_intract_cursor/> */}

        {/* <Team_card /> */}
        <Team_card />

        {/* <Resume_intract_cursor/> */}

        {/* <We /> */}
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default home;
