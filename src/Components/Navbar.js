import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const navToLogin=()=>{
        navigate('/login')
    }
    const navToService=()=>{
        navigate('/serviceprovider')
    }
  return (
   <nav className='navbar navbar-expand-lg bg-black'>
      <a class="navbar-brand text-white" href="#">CommunityConnect</a>


        <div className='container d-flex justify-content-end'>
            <button className='btn text-white' onClick={navToService}>Service Provider</button>
            <button className='btn text-white' onClick={navToLogin}>Login</button>
            <button className='btn text-white'>ContactUS</button>

        </div>
   </nav>
  )
}

export default Navbar
