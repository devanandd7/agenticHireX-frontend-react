import React from 'react'
import Crousal from './crousal';
import Contact from './contact';
import Navbar from './navbar';
import We from './we';
import Footer from './footer';
import Character_2D_intact_cousor from './try/character_2D_intact_cousor';
import Resume_rotate_intract_mouse from './try/resume_rotate_intract_mouse';
import Resume_intract_cursor from './try/resume_intract_cursor'

// import Page_1_human3d from './page_1_human3d';
// import ResumeFlipper from './resumeFlip';
const home = () => {
  return (
    <>
      {/* <Navbar /> */}
    <div className="App">
      {/* <Page_1_human3d /> */}
      {/* <ResumeFlipper/> */}

{/* <Character_2D_intact_cousor/> */}

<Resume_rotate_intract_mouse/>

      <Crousal />

      {/* <Resume_intract_cursor/> */}

      <We />
      <Contact />
          <Footer />
    </div>  
    </>
  )
}

export default home