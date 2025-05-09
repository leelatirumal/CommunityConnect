import React, { use, useEffect, useState } from 'react'
import { collection,getFirestore, getDocs, doc,addDoc,getDoc } from 'firebase/firestore';
import {auth,db} from "./firebase"
import { useNavigate } from 'react-router-dom';

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

  //userdata
          useEffect(() => {
            // Fetch current user from Firebase Authentication
            const user = auth.currentUser;
            
            // Check if the user exists and log the UID
            if (user) {
              console.log(user.uid);
          
              const fetchUserData = async () => {
                const db = getFirestore();
                const docRef = doc(db, "Users", user.uid); // Replace with actual uid
          
                try {
                  const docSnap = await getDoc(docRef);
                  if (docSnap.exists()) {
                    console.log(docSnap.data());
                    setUserData(docSnap.data());
                  } else {
                    console.log("No such document!");
                  }
                } catch (error) {
                  console.error("Error getting document:", error);
                }
              };
          
              fetchUserData(); // Call the async function inside useEffect
            } else {
              console.log("No user is logged in");
            }
          }, []); // Empty dependency array to run once when component mounts
          

  // Fetch current user from Firebase Authentication
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCustomerId(user.uid);  // Store the user ID if logged in
    } else {
      navigate('/login');  // Redirect to login if no user
    }
  }, [navigate]);

  
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

  const booking=async()=>{
    try {


      const bookingData = {
        customerId , // or null if no auth
        //provider
        providerId: selectedCard.id,
        providerName: selectedCard.FirstName,
        service: selectedCard.Service,
        phone: selectedCard.PhoneNumber,
        customeraddress:customerAddress,
        description:description,
        timeslot:timeSlot, // You can make this dynamic from input
        timestamp: new Date()
      };
  
      await addDoc(collection(db, "Bookings"), bookingData);
      console.log("booked")
    }
    catch(error){
        console.log(error)
    }

  }

  return (
    <div>
      <div id="navbar" className='container-fluid d-flex' >
            <a href=''>CommunityConnect</a>
            <div className='d-none d-md-flex justify-content-center mx-auto'>
              <input placeholder='EnterLocation' type='text' id='location' className='me-3'/>
              <input placeholder='Search' type="text" id='search'/>
            </div>
            <button className='btn mx-auto' onClick={()=>{SetProfileToggle(true)}}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-person-square" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
            </svg>
            </button>
      </div>

      <div className="container mt-4">
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








{profileToggle &&(
  <div className='position-absolute top-50 start-10'>
      <div>
      <h4>{userdata.FirstName}</h4>
      <button className='btn'>Orders</button><br/>
      <button className='btn'>LogOut</button>
      </div>
    </div>
)
}


{selectedCard && (
        <div className="d-block show " >
          <div className="">
            
              <div className="">
                <h6>{selectedCard.FirstName}</h6>
                <p>{selectedCard.Service}</p>
                <input placeholder='Address'onChange={(e)=>{setCustomerAddress(e.target.value)}} />
                <input placeholder='Time Slot 1pm-2pm' onChange={(e)=>{setTimeSlot(e.target.value)}}/>
                <input placeholder='description' onChange={(e)=>{setDescription(e.target.value)}} />
              </div>
              <div className="">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedCard(null)}
                >
                  Close
                </button>
                <button type="button" className="btn btn-success" onClick={()=>{booking()}}>
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
