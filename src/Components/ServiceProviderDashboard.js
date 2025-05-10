import React, { use, useEffect, useState } from 'react'
import {auth,db} from "./firebase"
import { collection, query, doc, where,getDocs,updateDoc } from "firebase/firestore";

import './ServiceProviderDashboard.css'
function ServiceProviderDashboard() {

  const [activeSection, setActiveSection] = useState("dashboard");
  const [orders, setOrders] = useState([]);

  const [profileToggle,SetProfileToggle]=useState(false);//profile toggle
  const provider=auth.currentUser;
  const id=provider.uid;
  console.log(id);

  const [refresh, setRefresh] = useState(false);

// call this after accept/decline
  const triggerRefresh = () => {
    setRefresh(prev => !prev); // toggles the value to trigger useEffect
  };


  //fetching the orders
  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const q = query(
        collection(db, "Bookings"),
        where("providerId", "==", id)
      );

      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  if (activeSection === "orders") {
    fetchOrders();
  }
}, [activeSection,refresh]);

//accpeting/declining orders
  const accept=async (id)=>{
  const userRef = doc(db, "Bookings", id); // assumes collection is "users" and UID is the doc ID

  try {
    await updateDoc(userRef, {Status:"Accepted"});
    console.log("User data updated successfully");
    triggerRefresh(); // 👈 refreshes order list

  } catch (error) {
    console.error("Error updating user:", error);
  }
  }


  //decling
  const decline=async (id)=>{
  const userRef = doc(db, "Bookings", id); // assumes collection is "users" and UID is the doc ID

  try {
    await updateDoc(userRef, {Status:"Declined"});
    console.log("User data updated successfully");
    triggerRefresh(); // 👈 refreshes order list
  } catch (error) {
    console.error("Error updating user:", error);
  }

  }


  return (
   <>
   <div id="navbar" className='container-fluid d-flex' >
            <a href='' className='navbar-brand text-white'>CommunityConnect</a>
           <div className='mx-auto'>
            <button className='btn' onClick={()=>{SetProfileToggle(true)}}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-person-square" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
            </svg>
            </button>
            </div>
    </div>

<div  id='serbox' >
    <div className='container-fluid row' style={{height:'100%'}}>
        <div className='col-3 '>
            <div className='d-flex flex-column justify-content-start'>
              <button className='btn mb-2' onClick={() => setActiveSection("dashboard")}>Dashboard</button>
              <button className='btn mb-2' onClick={() => setActiveSection("account")}>Account</button>
              <button className='btn mb-2' onClick={() => setActiveSection("orders")}>Orders</button>
              <button className='btn mb-2' onClick={() => setActiveSection("notifications")}>Notifications</button>
              <button className='btn mb-2' onClick={() => setActiveSection("settings")}>Settings</button>
              <button className='btn'>Logout</button>
            </div>
        </div>
        <div className='col-9'>
            {activeSection === "dashboard" && <h2>Dashboard Content</h2>}
            {activeSection === "account" && <h2>Account Details</h2>}
            {activeSection === "orders" && 
            <div className="container-fluid mt-4">
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Customer</th>
                      <th>Location</th>
                      <th>Time Slot</th>
                      <th>Description</th>
                      <th>Accept/Decline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td>{order.service}</td>
                        <td>{order.customeraddress}</td>
                        <td>{order.timeslot}</td>
                        <td>{order.description}</td>
                        <td>
                          

                          {/*
                          inpending
                          */
                          }
                          { order.Status ==="pending"  && (
                            <>
                              <button className='btn' onClick={()=>{
                                  accept(order.id)
                              }}>Accept</button>
                              <button className='btn' onClick={()=>{
                                decline(order.id)
                              }}>Decline</button>
                            </>                
                          )
                          }


                          {/*
                          Accpeted
                          */}
                          { order.Status === "Accepted" &&(
                            <p>Accepted</p>
                          )
                          }

                          {/*
                          Declined
                          */}
                          { order.Status === "Declined" &&(
                            <p>Declined</p>
                          )
                          }
                            
                         </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

                        
            }
            {activeSection === "notifications" && <h2>Notifications Center</h2>}
            {activeSection === "settings" && <h2>Settings Page</h2>}

        </div>
    </div>
    </div>
   
   </>
  )
}

export default ServiceProviderDashboard
