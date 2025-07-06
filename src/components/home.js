import React from 'react'
import Crousal from './crousal';
import Contact from './contact';
import Navbar from './navbar';
import We from './we';
// import CardRevealPage from './CardRevealPage'; 
// import Page_1_human3d from './page_1_human3d';
const home = () => {
  return (
    <>
      {/* <Navbar /> */}
    <div className="App">
      {/* <Page_1_human3d /> */}
      <Crousal />
      {/* <CardRevealPage/> */}
      <We />
      <Contact />
      
    </div>  
    </>
  )
}

export default home