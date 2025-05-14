import React, { use, useEffect, useState } from 'react'
import { collection,getFirestore, getDocs, doc,addDoc,getDoc } from 'firebase/firestore';
import {auth,db} from "./firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import CustomerOrders from './CustomerOrders'
import './CustomerDashboard.css';
function CustomerDashboard() {

  const [cards,setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null); // for modal
  const [customerId, setCustomerId] = useState(null); // To store UID
  const [profileToggle,SetProfileToggle]=useState(false);//profile toggle
  const[timeSlot,setTimeSlot]=useState()
  const[description,setDescription]=useState()
  const[customerAddress,setCustomerAddress]=useState()
  const navigate = useNavigate();
  const [userdata,setUserData]=useState();

  const [screen,setScreen]=useState("mainscreen");

  //userdata

        useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const fetchUserData = async () => {
                try {
                  const docRef = doc(db, "Users", user.uid);
                  const docSnap = await getDoc(docRef);
                  if (docSnap.exists()) {
                    setUserData(docSnap.data());
                    setCustomerId(user.uid); // use user.uid directly
                  } else {
                    console.log("No such document!");
                  }
                } catch (error) {
                  console.error("Error getting document:", error);
                }
              };
              fetchUserData();
            } else {
              // user is logged out
              navigate('/login');
            }
          });

          return () => unsubscribe(); // clean up listener on unmount
        }, []);

          

  // Fetch service provider data from Firebase Authentication 
      useEffect(()=>{
            const fetchData= async ()=>{
            const querySnapshot= await getDocs(collection(db,"ServiceProviders"))
              const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setCards(data);
            };
            fetchData();
          })

  //Booking
  const booking=async()=>{
    try {
      const bookingData = {
        //customer
        CustomerId:customerId ,
        CustomerName:userdata.FirstName,
        CustomerAddress:customerAddress,
        //provider
        ProviderId: selectedCard.id,
        ProviderName: selectedCard.FirstName,
        Service: selectedCard.Service,
        ProviderPhoneNumber: selectedCard.PhoneNumber,

        Description:description,
        Status:"Pending",
        TimeSlot:timeSlot, // You can make this dynamic from input
        TimeStamp: new Date()
      };
  
      await addDoc(collection(db, "Bookings"), bookingData);
      console.log("booked")
    }
    catch(error){
        console.log(error)
    }
      setSelectedCard(null)

  }

  return (
    <div>
      <div id="navbar" className='container-fluid d-flex' >
            <a href='' className='text-white'>CommunityConnect</a>
            <div className='d-none d-md-flex justify-content-center mx-auto'>
              <input placeholder='EnterLocation' type='text' id='location' className='me-3'/>
              <input placeholder='Search' type="text" id='search'/>
            </div>
            <button className='btn mx-auto' onClick={()=>{SetProfileToggle(profileToggle => !profileToggle)}}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-person-square" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
            </svg>
            </button>
      </div>

         { screen ==="mainscreen" && (  <div className="container mt-4">
            <div className="row">
              {cards.map((card, index) => (
                <div className="col-12 col-sm-6 col-md-4 mb-4" key={index}>
                      <div className="card h-100">
                        <img
                          src={card.image} // your image path here
                          className="card-img-top"
                          alt="Card"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{card.FirstName}</h5>
                          <p className="card-text">{card.Location}</p>
                          <p className='card-text'>PhoneNumber:{card.PhoneNumber}</p>
                          <a href="#" className="btn btn-primary mt-auto" onClick={() => setSelectedCard(card)} >
                            Book Now
                          </a>
                        </div>
                      </div>
                </div>
              ))}
            </div>
          </div>
          )
        }

    {
      /*
      ORDERS
      */
    }
        {
          screen ==="orders" &&(
            <CustomerOrders/>
          )
        }




{profileToggle &&(
  <div  className="position-absolute bg-white border rounded shadow p-3"
      style={{ top: '10%', left: '80%', right:'0%',zIndex: 1000 }}>
      <div>
      <h4>{userdata.FirstName}</h4>
      <button className='btn' onClick={()=>{setScreen("orders")}}>Orders</button><br/>
      <button className='btn' onClick={()=>{navigate('/login')}}>LogOut</button>
      </div>
    </div>
)
}


{selectedCard && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h5 className="mb-3">{selectedCard.FirstName}</h5>
      <p className="mb-2"><strong>Service:</strong> {selectedCard.Service}</p>
      <input
        className="form-control mb-2"
        placeholder="Address"
        onChange={(e) => setCustomerAddress(e.target.value)} required
      />
      <input
        className="form-control mb-2"
        placeholder="Time Slot (e.g. 1pm - 2pm)"
        onChange={(e) => setTimeSlot(e.target.value)} required
      />
      <input
        className="form-control mb-3"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)} required
      />
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={() => setSelectedCard(null)}
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => booking()}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  </div>
)}

</div>
  )
}

export default CustomerDashboard
