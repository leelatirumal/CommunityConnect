import React, { useState } from 'react';
import { auth, db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import Navbar2 from './Navbar2';
import './Login.css'
function Login() {
  const navigate = useNavigate();

  // Register states
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const Register = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      const user = userCredential.user;

      await setDoc(doc(db, 'Users', user.uid), {
        Email: registerEmail,
        FirstName: fname,
        LastName: lname,
        PhoneNumber:phoneNumber
      });
      
      console.log('Registered successfully');
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;
      console.log(user.uid)
      navigate('/customerdashboard', {
        state: {
          userid: user.uid,
        },
      });
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <>
    <Navbar2/>
      <div className="page-container">
  <div className="container">
    <div className="row justify-content-around align-items-start">
    {/*
        Login
    */}
              <div className='col-lg-4 col-md-5 col-12  flex-column justify-content-start mt-4 ' id='login'  >
                <h2 className='text-center h2' >Login</h2>
                <form onSubmit={login} className='form' >
                  <label>Email</label><br/>
                  <input type="email" onChange={(e) => setLoginEmail(e.target.value)} /><br/>
                  <label>Password</label><br/>
                  <input type="password" onChange={(e) => setLoginPassword(e.target.value)} /><br/>
                  <button type="submit" className='btn'>Login</button>
                </form>
              </div>

    {/*
        Registration
    */}

          <div className='col-lg-4 col-md-5 col-12  flex-column justify-content-start  mt-3' id='register'>
                <h2 className='text-center h2'>Register</h2>
                <form onSubmit={Register} className="form">
                  <label>First Name</label><br/>
                  <input type="text" onChange={(e) => setFname(e.target.value)} /><br/>
                  <label>Last Name</label><br/>
                  <input type="text" onChange={(e) => setLname(e.target.value)} /><br/>
                  <label>Email</label><br/>
                  <input type="email" onChange={(e) => setRegisterEmail(e.target.value)} /><br/>
                  <label>Password</label><br/>
                  <input type="password" onChange={(e) => setRegisterPassword(e.target.value)} /><br/>
                  <label>PhoneNumber</label><br/>
                  <input type="number" onChange={(e) => setPhoneNumber(e.target.value)} /><br/>
                  <button type="submit" className='btn '>Submit</button>
                  
                </form>
          </div>
    </div>
    </div>
</div>
    </>
  );
}

export default Login;
