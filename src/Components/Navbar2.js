import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar2() {
  const navigate=useNavigate();
  return (
    <div className='navbar ' style={{backgroundColor:'#0f5499'}}>
        <a className='navbar-brand btn text-white' href=''>CommunityConnect</a>
        <div>
            <button className='btn text-white' onClick={()=>{navigate('/aboutus')}}>AboutUs</button>
            <button className='btn text-white' onClick={()=>{navigate('/contactus')}}>ContactUs</button>

        </div>
    </div>
  )
}

export default Navbar2
