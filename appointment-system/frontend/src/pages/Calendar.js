import React, {useState, useEffect} from "react"; 
import "./Calendar.css"; 
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Calendar = () => {

     const [selectedDoctor, setSelectedDoctor] = useState("");                                       //managing component state (selected doctor-> stated for tracking?)                                                                          
     const doctors = [
         { id: 1, name: "Dr. Ahmad" },
         { id: 2, name: "Dr. Amar" },
     ];
 
     const handleDoctorChange = (e) => {                                                            //select from dropdown-> updated 
         setSelectedDoctor(e.target.value); 
     };

     const days = [                                                                                //available days list-> stated 
        "Monday 24", "Tuesday 25", "Wednesday 26", "Thursday 27", "Friday 28", "Saturday 29", "Sunday 30"
    ];
    
     const [selectedDay, setSelectedDay] = useState(null);                                        //date index store
     const [selectedDate, setSelectedDate] = useState("");                                       //date format to store in-> yyyy-mm-dd
     const [availableTimings, setAvailableTimings] = useState({                                  //available time morning-evening store-> initially empty 
       morning: [], 
       evening: [], 
     });
    
     useEffect(() => {                                                                           //fetching data on state change (selected date changes-> fetch appointment time from Api) 
       if (selectedDate) { 
         fetch(`http://localhost:5000/api/appointments/by-date?date=${selectedDate}`) 
           .then(response => response.json())
           .then(data => {
             console.log("Fetched data:", data); 
             setAvailableTimings(data);
           })
           .catch(error => console.error("Error fetching appointments:", error));
       }
     }, [selectedDate]); 

     const handleDateClick = (index) => {                                                        //selected date index-> updated  
      setSelectedDay(index); 
      const date = new Date(`2025-03-${days[index].split(" ")[1]}`);
      setSelectedDate(date.toISOString().split("T")[0]);
    };

    return(
        
        <div className="admin-container"> 
        <Header />
        <Sidebar />
     
            <div className="admin-content">
                <div className="doctors-dropdown">
                    <h2>Select Doctor</h2>               
                    <select value={selectedDoctor} onChange={handleDoctorChange} className="doctor-select">                              {/*updated on selected change */}
                        <option value="">Select a doctor</option>
                              {doctors.map((doctor) => (                                          //iterating over doctors list available-> generate option element of list  
                        <option key={doctor.id} value={doctor.name}>                              {/*value set-> to doctor name */}
                              {doctor.name}                                                       {/*display in dropdown*/}
                        </option> 
                               ))}
                    </select>
                </div>

            <div className="calendar-board">
                <div className="calendar-container">
                    <div className="left-panel">
                    <h2>Schedule Calendar</h2>
                       <div className="date-navigation">
                              {days.map((day, index) => (                                          //iterates over-> day string with its index in the array    
                                 <button key={index} className={`date-button ${selectedDay === index ? "selected" : ""}`}                  /* button for days->selectedDay matches the current index-> date highlighted */
                                         onClick={() => {                                          //selected date index-> updates selectedDate-> extract date from date stirng(numeric part only)-> date object created-> converts back to format-> update/set selectedDate 
                                             handleDateClick(index); 
                                            const date = new Date(`2025-03-${day.split(" ")[1]}`);
                                            setSelectedDate(date.toISOString().split("T")[0]);
                                         }}
                                 >
                              {day}
                                 </button>
                              ))}
                        </div>

            <div className="time-slots">
                <div>
                <h2 className="slot-heading">Morning</h2>
                   <div className="slot-grid">
                        {availableTimings?.morning?.length > 0 ? (                                  //timing exists for morning-evening slot-> iterate/map over them-> else No timings 
                         availableTimings.morning.map((slot, index) => (
                              <button key={index} className="slot-button">
                        {slot}
                              </button>
                        ))
                        ) : (
                   <p>No morning timings available.</p>
                   )}
                   </div>
                </div>
            <div>
                <h2 className="slot-heading">Evening</h2>
                    <div className="slot-grid">
                         {availableTimings?.evening?.length > 0 ? (            
                              availableTimings.evening.map((slot, index) => (
                              <button key={index} className="slot-button">
                                          {slot}
                              </button>
                         ))
                         ) : (
                   <p>No evening timings available.</p>
                   )}
                  </div>
            </div>
           </div>
          </div> 
         </div>
       </div> 
     </div> 
   </div>
   );
   }; 

export default Calendar; 
