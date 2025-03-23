import React from "react"; 
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard"; 
import Calendar from "./pages/Calendar"; 
import "./App.css"; 


const App = () => { 
  return(
   <div className="App">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes> 
   </div> 

  ); 
}; 

export default App;