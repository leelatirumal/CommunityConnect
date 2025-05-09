import React, { useState } from 'react';
import { auth, db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import Navbar2 from './Navbar2';

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
        phoneNumber:phoneNumber
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
        <div className="container row d-flex justify-content-around mt-5 ">
    {/*
        Login
    */}
              <div className='col-4 bg-white text-black d-flex flex-column justify-content-start' >
                <h2 className='text-center'>Login</h2>
                <form onSubmit={login} className='ms-4' >
                  <label>Email</label><br/>
                  <input type="email" onChange={(e) => setLoginEmail(e.target.value)} /><br/>
                  <label>Password</label><br/>
                  <input type="password" onChange={(e) => setLoginPassword(e.target.value)} /><br/>
                  <button type="submit" className='btn  text-black'>Login</button>
                </form>
              </div>

    {/*
        Registration
    */}

          <div className='col-4 bg-black text-white d-flex flex-column justify-content-start'>
                <h2 className='text-center'>Register</h2>
                <form onSubmit={Register} className="ms-4">
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
                  <button type="submit" className='btn text-white'>Submit</button>
                </form>
          </div>
    </div>

    </>
  );
}

export default Login;
