import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import CustomerDashboard from './Components/CustomerDashboard';
import ServiceProvider from './Components/ServiceProvider';
import ServiceProviderDashboard from './Components/ServiceProviderDashboard';
import DashboardWrapper from './Components/DashboardWrapper';
import service from './service'
import CustomerOrders from './Components/CustomerOrders';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';

function App() {
  return (
    <>
<BrowserRouter basename="/CommunityConnect">
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/serviceprovider" element={<ServiceProvider />} />
        <Route path="/serviceproviderdashboard" element={<ServiceProviderDashboard />} />
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path='/contactus' element={<ContactUs/> } />
        <Route path="/customerorders" element={<CustomerOrders/>} />
        <Route path="/customerdashboard" element={<CustomerDashboard />} />

      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
