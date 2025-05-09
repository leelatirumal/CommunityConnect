import React from 'react'
import Navbar from './Components/Navbar'

function Home() {
  return (
    <>
    <Navbar/> 

    <div className='container row ' >
        <div className='mt-5 col-6 '>
          <h3>
            No More 
            <br/>
             Excuses to Learn
          </h3>
          <p>
            There are three ways to retrieve data stored in Cloud Firestore. Any of these methods 
            can be used with documents, collections of documents, or the results of queries:

          </p>
          <button className='btn'>About US</button>
          

        </div>

        <div className='col-6'>
          <img  style={{height:'500px',width:'700px'}}src='https://cmexpertise.com/wp-content/uploads/2022/05/home-services-banner.svg'/>
        </div>
    </div>
    </>
  )
}

export default Home
