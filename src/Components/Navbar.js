import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
function Navbar() {
    const navigate = useNavigate();
    const [toggle,setToggle]=useState(false)
    const navToLogin=()=>{
        navigate('/login')
    }
    const navToService=()=>{
        navigate('/serviceprovider')
    }
  return (
   <nav className='navbar navbar-expand-lg '>
      <a class="navbar-brand text-white" href="#">CommunityConnect</a>

        <div className=' d-flex justify-content-end ms-auto'>
        <div className=' d-none d-lg-block   align-items-center  '>
            <button className='btn text-white' onClick={navToService}>Service Provider</button>
            <button className='btn text-white' onClick={navToLogin}>Login</button>
            <button className='btn text-white'>ContactUS</button>
        </div>

        <div className='d-flex d-lg-none justify-content-end w-100 ' id='navbar-button'>
            <button className='btn text-white'onClick={()=>{setToggle(toggle =>!toggle)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="26" fill="white" class="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
            </button>
        </div>
        </div>

        { toggle &&(
            <div className='container d-flex flex-column position-relative '>
                <button className='btn text-white'>Service Provider</button>
                <button className='btn text-white'>Login</button>
                <button className='btn text-white'>ContactUS</button>

            </div>
        )

        }
   </nav>
  )
}

export default Navbar
