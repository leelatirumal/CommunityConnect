import { useLocation } from "react-router-dom";
import CustomerDashboard from "./CustomerDashboard";

function DashboardWrapper() {
  const location = useLocation();
  const { userid } = location.state || {};  // Get the name from state
    
  return <CustomerDashboard  />;
}

export default DashboardWrapper;
