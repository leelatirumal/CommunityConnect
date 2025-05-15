import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Part3.css'
function Part3() {
      const navigate=useNavigate();

  return (
    <>
    
    <div className='container w-80' id='container'>
      <div>
        <h4 className='text-center'>Bridging the Gap Between Urban & Rural Communities</h4>
        <p className='text-center'>Many people in urban and rural areas struggle to find reliable service providers for
          essential household and maintenance needs. Community Connect is here to solve that 
          problem by connecting you directly with trusted local professionals, making it easy
          to find and book services in your area.
        </p>
      </div>

      <div className='d-flex row justify-content-around'>

         <div className=" col-lg-3 col-md-5 col-sm-12 mt-sm-1 mt-md-2 bg-white d-flex flex-column align-items-center p-3" id='box'>
              <svg xmlns="http://www.w3.org/2000/svg"  className="" width="32" height="32" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
              </svg>
            <h5 className="font-semibold">Easy Contact</h5>
            <p className="text-sm text-gray-500">Find and connect with verified service providers quickly and easily.</p>
        </div>

       <div className="col-lg-3 col-md-5 col-sm-12  mt-sm-1 mt-md-2 bg-white d-flex flex-column align-items-center p-3" id='box'>
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
            </svg>
          <h5 className="font-semibold">Trusted Community</h5>
          <p className="text-sm text-gray-500">We vet all providers to ensure quality and reliability for your peace of mind.</p>
        </div>

      <div className="col-lg-3 col-md-5 col-sm-12   mt-sm-1 mt-md-2 bg-white d-flex flex-column align-items-center p-3" id='box'>
         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>
        <h5 className="font-semibold">Local Services</h5>
        <p className="text-sm text-gray-500">Access services tailored to your urban or rural location with ease.</p>
      </div>
        
      </div>
    </div>

</>
  )
}

export default Part3
