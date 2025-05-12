import React,{useEffect, useState} from 'react'
import {auth,db} from "./firebase"
import { collection, query, doc, where,getDocs,updateDoc } from "firebase/firestore";

function CustomerOrders() {

  const [orders, setOrders] = useState([]);

  const user=auth.currentUser;
  const id=user.uid;



  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "Bookings"),
          where("CustomerId", "==", id)
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
    fetchOrders()
  
  }, []);
  return (
    <>
    <div>
      <h3>Orders</h3>
                  <div className="container-fluid mt-4">
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>ProviderName</th>
                      <th>PhoneNumber</th>
                      <th>Service</th>
                      <th>Time Slot</th>
                      <th>Description</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td>{order.ProviderName}</td>
                        <td>{order.ProviderPhoneNumber}</td>
                        <td>{order.Service}</td>
                        <td>{order.TimeSlot}</td>
                        <td>{order.Description}</td>
                        <td>
                          

                          {/*
                          inpending
                          */
                          }
                          { order.Status ==="pending"  && (
                            <>
                             <h6>Pending</h6>
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
    </div>
    </>
  )
}

export default CustomerOrders
