import React from 'react'
import Crousal from './crousal';
import Contact from './contact';
import We from './we';
const home = () => {
  return (
    <div className="App">
      <Crousal />
      <Contact />
      <We />
    </div>  
  )
}

export default home