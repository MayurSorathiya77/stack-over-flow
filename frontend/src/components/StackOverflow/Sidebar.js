 import React from 'react'
 import './CSS/Sidebar.css'
import Public from '@mui/icons-material/Public';
import StarsIcon from '@mui/icons-material/Stars';
import WorkIcon from '@mui/icons-material/Work';
import {Link} from 'react-router-dom'
function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-options'>
                    <div className='sidebar-option'>
                        <Link to='/'>Home</Link>
                     </div>
                    <div className='sidebar-option'>
                        <Link>PUBLIC</Link>

                        <div className='link'>
                                
                                <div className='link-tag'>
                                    <Public/>
                                    <Link to='/'>Question</Link>
                                </div>
                                <div className='tags'>
                                    <Link to="/tag">Tags</Link>
                                    <Link to="/users">Users</Link>
                                </div>
                                 
                        </div>
                    </div>

                    <div className='sidebar-option'>
                            <p>COLLECTIVES</p>

                        <div className='link'>
                                
                                <div className='link-tag'>
                                    <StarsIcon/>
                                    <Link>Explore Collectives</Link>
                                </div>                                 
                        </div>
                    </div>

                    <div className='sidebar-option'>
                            <p>FIND A JOB</p>

                        <div className='link'>
                                
                                <div className='link-tag'>
                                    <Link>Question</Link>
                                </div>  
                                                                
                        </div> 
                    </div>

                    <div className='sidebar-option'>
                            <p>TEAMS</p>

                        <div className='link'>
                                
                                <div className='link-tag'>
                                    <WorkIcon/>
                                    <Link>Companies</Link>
                                </div>  
                                                              
                        </div> 
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Sidebar
