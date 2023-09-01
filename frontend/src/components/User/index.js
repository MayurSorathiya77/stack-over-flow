import React from 'react'
import '../StackOverflow/CSS/Main.css'
import Sidebar from '../StackOverflow/Sidebar'
import Main from './Main.js'
function Index() {
  
  return (
    
    <div className='stack-index'>
  <div className='stack-index-content'>
    <Sidebar/>
    <Main/>
  </div>
</div>

  )
}

export default Index
//