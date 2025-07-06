import React from 'react'
import Crousal from './crousal';
import Contact from './contact';
import Navbar from './navbar';
import We from './we';
const home = () => {
  return (
    <>
      {/* <Navbar /> */}
    <div className="App">
      <Crousal />
      <Contact />
      <We />
    </div>  
    </>
  )
}

export default home