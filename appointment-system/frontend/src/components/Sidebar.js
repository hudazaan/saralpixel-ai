import React from "react"; 
import { AiFillDashboard } from "react-icons/ai";
import { FaCalendarCheck, FaCog, FaSignOutAlt} from "react-icons/fa"; 
import "./Sidebar.css"; 
import { Link } from "react-router-dom";

const Sidebar = () => {
   return(
      <div className="admin-sidebar">
                      <ul>
                          <li><Link to="/"><AiFillDashboard size={20} />Dashboard</Link></li>
                          <li><Link to="/calendar"><FaCalendarCheck size={20} />Appointments</Link></li>
                          <li><Link to="#"><FaCog size={20} /> Settings</Link></li>
                          <li><Link to="#"><FaSignOutAlt size={20} /> Logout</Link></li>
                      </ul>
                  </div>
   );
};

export default Sidebar; 
