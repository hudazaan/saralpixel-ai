import React from "react"; 
import { useLocation, useNavigate } from "react-router-dom";
import {FaSignInAlt} from "react-icons/fa"; 
import "./Header.css"; 

const Header = () => {
    const navigate= useNavigate(); 
    const location = useLocation();  

   return(
     <header className="admin-header">
                     <h1>Appointment System</h1>
                     <div className="header-right">
                     {/* <button className="bck-btn" onClick={() => navigate("/calendar")}>📅 Calendar</button> */} 
                     
                     <button className="bck-btn" 
                      onClick={() => navigate(location.pathname === "/calendar" ? "/" : "/calendar")}>
                    📅 {location.pathname === "/calendar" ? "Admin Dashboard" : "Calendar"}
                     </button>

                     <input type="text" placeholder="Search..." className="admin-search-bar" />
                     <span className="login-icon"><FaSignInAlt size={20} />Login</span>
                     </div>
                 </header>
     
   );
};

export default Header; 


