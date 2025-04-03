import React, {useState, useEffect} from "react"; 
import "./Calendar.css"; 
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Calendar = () => {

     const [weekOffset, setWeekOffset] = useState(0); 
     const [selectedDoctor, setSelectedDoctor] = useState("");                                       //managing component state (selected doctor-> stated for tracking?)                                                                          
     const doctors = [
         { id: 1, name: "Dr. Ahmad" },
         { id: 2, name: "Dr. Amar" },
     ];
 
     const handleDoctorChange = (e) => {                                                            //select from dropdown-> updated 
         setSelectedDoctor(e.target.value); 
     };

    const getCurrentWeekDates = (offset = 0) => {
        const today = new Date();
        today.setDate(today.getDate() + (offset * 7)); 
        const currentDay = today.getDay(); 
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1)); 
        const days = [];
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          days.push({
             name: dayNames[i],
             date: date.toISOString().split("T")[0], 
             display: `${dayNames[i]} ${date.getDate()}` 
        });
      }
      return days;
    };

    const [days, setDays] = useState(getCurrentWeekDates(weekOffset));
    useEffect(() => {
      setDays(getCurrentWeekDates(weekOffset));
    }, [weekOffset]);

    const [selectedDay, setSelectedDay] = useState(null);                                        //date index store
    const [selectedDate, setSelectedDate] = useState("");                                       //date format to store in-> yyyy-mm-dd
    const [availableTimings, setAvailableTimings] = useState({                                  //available time morning-evening store-> initially empty 
       morning: [], 
       evening: [], 
     });
    
   useEffect(() => {
    const updateWeekOnMonday = () => {
      const now = new Date();
      if (now.getDay() === 1) { 
        setWeekOffset(0); 
      }
    };
    const interval = setInterval(updateWeekOnMonday, 86400000);
    return () => clearInterval(interval);
   }, []);


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
      setSelectedDate(days[index].date); 
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
                <div className="week-navigation">
                <button className="weekButton" onClick={() => setWeekOffset(prev => prev - 1)}>◀ Previous</button>
                <span>Week of {new Date(days[0].date).toLocaleDateString()}</span>
                <button className="weekButton" onClick={() => setWeekOffset(prev => prev + 1)}>Next ▶</button>
            </div>

                <div className="calendar-container">   
                    <div className="left-panel">
                    <h2>Schedule Calendar</h2>
                       <div className="date-navigation">
                              {days.map((day, index) => (                                          //iterates over-> day string with its index in the array    
                                 <button key={index} className={`date-button ${selectedDay === index ? "selected" : ""}`}                  /* button for days->selectedDay matches the current index-> date highlighted */
                                         onClick={() => {                                          //selected date index-> updates selectedDate-> extract date from date stirng(numeric part only)-> date object created-> converts back to format-> update/set selectedDate 
                                             handleDateClick(index);                                                                                   
                                         }}
                                 >
                              {day.display}
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
