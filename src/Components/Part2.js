import React from 'react'
import './Part2.css'
function Part2() {

    const services=[
        {
            src: `${process.env.PUBLIC_URL}/images/Cleaning.jpg`,
            service:'Cleaning',
            description:'Professional cleaning services for your home and office, ensuring a spotless environment.'
        },
        {
            src: `${process.env.PUBLIC_URL}/images/Carpenter.jpg`,
            service:'Carpenter',
            description:'Skilled carpenters for custom furniture, repairs, and woodwork projects.'
        },
        {
            src: `${process.env.PUBLIC_URL}/images/Washingmachine.jpg`,
            service:'Appliance Repair',
            description:'Fast and reliable repair services for all household appliances.'
        },
         {
            src: `${process.env.PUBLIC_URL}/images/AC.jpg`,
            service:'AC repair',
            description:'Keep your air conditioner running smoothly with our expert maintenance.'
        },
         
    ]
  return (
    <div className='container ' id='cont'>
        <div className='row  justify-content-around' id='row'>
            <div className='col-lg-5 col-md-6 col-sm-12 mt-5 mb-3' id='left'>
                <h4>Service We Provide</h4>
                <p>Our expert team offers a wide range of professional services tailored to
                     meet your needs. Quality, reliability, and customer satisfaction are our
                      top priorities.

                </p>
                <div className='row'>
                      {  services.map((ser)=>{
                           return(
                             <div className='col-6 text-center'>
                                <img src={ser.src} className='img-fluid'/>
                                 <h5>{ser.service}</h5>
                                 <p>{ser.description}</p>
                            </div>
                           )
                        })
                        }
                </div>
            </div>
            <div className='col-lg-5 col-md-6 col-sm-12 mt-5 mb-3' id='right'>
                <h4>Why Choose US ?</h4>
                <p>At Community Connect, we combine expertise with dedication to deliver exceptional service. 
                    Our professionals are vetted, trained, and committed to exceeding your expectations.
                     We use the latest tools and techniques to ensure quality and efficiency in every job.</p>
                <div className='row'>
                    <img src={process.env.PUBLIC_URL+'/images/Img1.jpg'} id='img1' className='col-lg-6 mt-3 col-sm-12'/>
                    <img src={process.env.PUBLIC_URL+'/images/Img2.jpg'} id='img2' className='col-lg-6 mt-3  col-sm-12' />
                    <img src={process.env.PUBLIC_URL+'/images/Img3.jpg'} id='img3' className='col-lg-6 mt-3 col-sm-12'/>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Part2
