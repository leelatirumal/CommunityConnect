import React, { useState } from 'react'
import {auth,db} from "./firebase"
import { useNavigate } from 'react-router-dom';
import { setDoc ,doc} from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import Navbar2 from './Navbar2';

function ServiceProvider() {

    const navigate = useNavigate();
    
    //login
    const [loginEmail,setLoginEmail]=useState("")
    const [loginPassword,setLoginPassword]=useState("")
    //register
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [fname,setFname]=useState("")
    const [lname,setLname]=useState("")
    const [selectedService, setSelectedService] = useState('');
    const [location, setLocation] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');


    const login=async (e)=>{
      e.preventDefault();
          if (!loginEmail || !loginPassword) {
              alert('Please fill in all login fields.');
              return;
            }

            try {
              const providerCredential=  await signInWithEmailAndPassword(auth,loginEmail,loginPassword);
              navigate('/serviceproviderdashboard')
            } catch (error) {
              console.log(error)
            }
    }

    const Register=async(e)=>{
        e.preventDefault();
        try {
          await createUserWithEmailAndPassword(auth,email,password)
                  const serviceprovider=auth.currentUser;
                  if(serviceprovider){
                    await setDoc(doc(db,"ServiceProviders",serviceprovider.uid),{
                      Email:email,
                      FirstName:fname,
                      LastName:lname,
                      Location:location,
                      Service:selectedService,
                      PhoneNumber:phonenumber,
                    });
                  }
                  console.log("Registered successfully")
        } catch (error) {
          console.log(error)
        }
    }
  return (
    <>
    <Navbar2/>
    <div className='container row d-flex justify-content-around mt-5'>
    <div className='d-flex col-4'>
      <form className='d-flex flex-column'>
          <label>Email</label>
          <input type='text' value={loginEmail} onChange={(e)=>{setLoginEmail(e.target.value)}}/>
          <label>Password</label>
          <input type='password'value={loginPassword}  onChange={(e)=>{setLoginPassword(e.target.value)}}/>
          <button type='submit' onClick={login}>Login</button>
      </form>
    </div>

    
    <div className=' d-flex col-4'>
      <form className='d-flex flex-column'>
        <label>FirstName</label>
        <input type='text' onChange={(e)=>{setFname(e.target.value)}}/>
        <label>LastName</label>
        <input type='text' onChange={(e)=>{setLname(e.target.value)}}/>
        <label>Email</label>
        <input type='text' onChange={(e)=>{setEmail(e.target.value)}}/>
        <label>Password</label>
        <input type='text' onChange={(e)=>{setPassword(e.target.value)}}/>
        <label>PhoneNumber</label>
        <input type='text' onChange={(e)=>{setPhoneNumber(e.target.value)}}/>
        <label htmlFor="service">Service</label>
          <select id="service" value={selectedService} onChange={(e) => setSelectedService(e.target.value)} style={{ width: '197px' }} required>
              <option value="">Select a service</option>
              <option value="AC Servicing">AC Servicing</option>
              <option value="WashingMachine Repair">WashingMachine Repair</option>
              <option value="Vacuum Cleaning">Vacuum Cleaning</option>
              <option value="Spa">Spa</option>
              <option value="WaterPurifier Cleaning">WaterPurifier Cleaning</option>
              <option value="Home Painting">Home Painting</option>
              <option value="Electrical Repair">Electrical Repair</option>
              <option value="Cleaning and PestControl">Cleaning and PestControl</option>
              <option value="Pedicure">Pedicure</option>
              <option value="Saloon">Saloon</option>                  
          </select>
        <label>Location</label>
        <input type='text' onChange={(e)=>{setLocation(e.target.value)}}/>
        <button type='submit'  onClick={Register}>Submit </button>

      </form>
    </div>
    </div>
</>
  )
}

export default ServiceProvider
