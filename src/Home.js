import React from 'react'
import Navbar from './Components/Navbar'
import { useNavigate } from 'react-router-dom'
import Part3 from './Components/Part3';
import Part2 from './Components/Part2';
function Home() {

  const navigate=useNavigate();
  return (
    <>
   <Navbar/>
    <div className='container mt-3'>
  <div className='row'>
    <div className='col-12 col-lg-6'>
      <h3>
        No More 
        <br />
        Excuses to Learn
      </h3>
      <p>
        There are three ways to retrieve data stored in Cloud Firestore. Any of these methods 
        can be used with documents, collections of documents, or the results of queries:
      </p>
      <button className='btn text-white' style={{backgroundColor:'#0f5499'}} onClick={() => { navigate('/aboutsus') }}>About Us</button>
    </div>

    <div className='col-12 col-lg-6'>
      <img
        className='img-fluid'  // This ensures the image is responsive
        style={{ height: '500px', objectFit: 'cover' }}  // Adjust 'objectFit' for proper cropping/scaling
        src='https://cmexpertise.com/wp-content/uploads/2022/05/home-services-banner.svg'
        alt='Service Banner'
      />
    </div>
  </div>
</div>


{
  /* */
}
    <Part2/>

{
/* */
}
    <Part3/>

{
/* footer*/
}

    </>
  )
}

export default Home
