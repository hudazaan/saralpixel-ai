import React, { useState } from "react"; 
import "./AdminDashboard.css"; 
import { FaSave, FaCopy  } from "react-icons/fa"; 
import Header from "../components/Header"
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => { 

     const [timings, setTimings] = useState({                                         //appointment timings for days->stated
        Monday:  { morningStart: "", morningEnd: "", eveningStart: "", eveningEnd: "" },
        Tuesday:  { morningStart: "", morningEnd: "", eveningStart: "", eveningEnd: "" },
        Wednesday:  { morningStart: "", morningEnd: "", eveningStart: "", eveningEnd: "" },
        Thursday:  { morningStart: "", morningEnd: "", eveningStart: "", eveningEnd: "" },
        Friday: { morningStart: "", morningEnd: "", eveningStart: "", eveningEnd: "" },
        Saturday:  { morningStart: "", morningEnd: "", eveningStart: "", eveningEnd: "" },
        Sunday:  { morningStart: "", morningEnd: "", eveningStart: "", eveningEnd: "" },
     }); 

     const handleChange = (day, period, value) => {                                     //user enter values-> update timings
        setTimings({
            ...timings,
            [day]: { ...timings[day], [period]: value }, 
        }); 
     }; 
  
      const handleCopy = async (day) => {                                                //copy selected day time-> to clipboard 
        const morningStart = timings[day].morningStart || "Not set";
        const morningEnd = timings[day].morningEnd || "Not set";
        const eveningStart = timings[day].eveningStart || "Not set";
        const eveningEnd = timings[day].eveningEnd || "Not set";
        const copyText = `${morningStart}\t${morningEnd}\t${eveningStart}\t${eveningEnd}`;    
        try {
          await navigator.clipboard.writeText(copyText);
          alert("Row values copied to clipboard!");
        } catch (error) {
          console.error("Failed to copy text:", error);
          alert("Failed to copy text to clipboard.");
        }
      };

      const handlePaste = (day, e) => {                                                   //paste selected day time-> from clipboard
        e.preventDefault(); 
        const pastedText = e.clipboardData.getData("text");
        const [morningStart, morningEnd, eveningStart, eveningEnd] = pastedText.split("\t");  
        setTimings({
          ...timings,
          [day]: {
            morningStart: morningStart || timings[day].morningStart,
            morningEnd: morningEnd || timings[day].morningEnd,
            eveningStart: eveningStart || timings[day].eveningStart,
            eveningEnd: eveningEnd || timings[day].eveningEnd,
          },
        });
      };

      const handleSave = async (day) => {                                                  //save timings of date-> to db 
        if (!timings[day].morningStart || !timings[day].morningEnd || !timings[day].eveningStart || !timings[day].eveningEnd) {
          alert("Please fill all timing fields before saving.");
          return;
        }   
        const requestBody = {
          doctorId: "65f1c29e4f1a2b3c4d5e6f7a",             //dummy 
          date: new Date().toISOString().split("T")[0],     //current 
          availableTimings: { 
            morning: [timings[day].morningStart, timings[day].morningEnd],
            evening: [timings[day].eveningStart, timings[day].eveningEnd],
          },
        };     
        console.log("Saving timings:", requestBody);     
        try {
          const response = await fetch("http://localhost:5000/api/appointments/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
          if (response.ok) {
            alert(`Timings for ${day} saved successfully!`);
          } else {
            const errorData = await response.json(); 
            console.error("Failed to save timings:", errorData);
            alert("Failed to save timings.");
          }
        } catch (error) {
          console.error("Error saving timings:", error);
          alert("An error occurred while saving timings.");
        }
      };

    const [firstName, setFirstName] = useState("");                                            //patient data for form-> stated 
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [fileNumber, setFileNumber] = useState("");
    const [location, setLocation] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {                                                         //handle form submission
     e.preventDefault();
    if (!firstName || !lastName || !mobile || !fileNumber || !location || !dateOfBirth || !gender) {
      alert("Please fill all fields before saving.");
      return;
    }
    if (isSubmitting) return; 
    setIsSubmitting(true);
    const checkForDuplicatePatient = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/patients/check-duplicate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, mobile, fileNumber }),  
        });
        const data = await response.json();
        return data.isDuplicate || false;
      } catch (error) {
        console.error("Error:", error);
        return false; 
      }
    };

    const isDuplicate = await checkForDuplicatePatient();                                          //check for existing?  
    if (isDuplicate) {
      alert("A patient with the same credentials already exists.");
      setIsSubmitting(false);
      return;
    }

    try {                                                                                          //save patient-> to backend  
      const response = await fetch("http://localhost:5000/api/patients/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          mobile,
          fileNumber,
          location,
          dateOfBirth,
          gender,
        }),
      });
      const data = await response.json();
      console.log("Patient added:", data);
      alert("Patient added successfully!");
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Failed to add patient.");
    } finally {
      setIsSubmitting(false); 
    }
  };

     return(

        <div className="admin-container"> 
        <Header />
        <Sidebar />

        <div className="admin-content">
            <div className="admin-dashboard">
                <h2>Appointment Timings</h2> 
                   <table>
                     <thead>
                        <tr>
                           <th>Day</th>
                           <th>Morning Start</th> 
                           <th>Morning End</th>
                           <th>Evening Start</th>
                           <th>Evening End</th>
                           <th>Actions</th>
                        </tr>
                     </thead> 
                     <tbody>
                          {Object.keys(timings).map((day) => (
                            <tr key={day}>
                            <td>{day}</td>                                                              {/*date buttons-> change on input values, paste the copied value*/} 
                            <td>
                                <input type="text" value={timings[day].morningStart} onChange={(e) => handleChange(day, "morningStart", e.target.value)} 
                                 onPaste={(e) => handlePaste(day, e)} />
                            </td> 

                            <td>
                                <input type="text" value={timings[day].morningEnd} onChange={(e) => handleChange(day, "morningEnd", e.target.value)} 
                                 onPaste={(e) => handlePaste(day, e)} />
                            </td> 

                            <td>
                                <input type="text" value={timings[day].eveningStart} onChange={(e) => handleChange(day, "eveningStart", e.target.value)} 
                                 onPaste={(e) => handlePaste(day, e)} />
                            </td> 

                            <td>
                                <input type="text" value={timings[day].eveningEnd} onChange={(e) => handleChange(day, "eveningEnd", e.target.value)} 
                                 onPaste={(e) => handlePaste(day, e)} />
                            </td> 
                            <td >  
                               <FaSave 
                                  size={20} 
                                  className="save-icon" 
                                  onClick={() => handleSave(day)} 
                                  title="Save"
                               />
                              <FaCopy 
                                  size={20} 
                                  className="copy-icon" 
                                  onClick={() => handleCopy(day)} 
                                  title="Copy"
                              />
                          </td>
                          </tr>
                          ))}
                       </tbody>
                     </table>
        </div>

        <div className="add-patient-form">  
            <h2>Add Patient</h2>                  
            <form onSubmit={handleSubmit}> 
              <div className="form-grid">
               <input type="text" id="firstName" name="firstName" placeholder="First Name" className="input-field"   
                      value={firstName} onChange={(e) => setFirstName(e.target.value)}/>              {/*form fields-> get the selected target values -> update/set field with the selected values*/}
               
               <input type="text" id="lastName" name="lastName" placeholder="Last Name" className="input-field"  
                      value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        
               <input type="text" id="mobile" name="mobile" placeholder="Mobile" className="input-field" 
       
                      value={mobile} onChange={(e) => setMobile(e.target.value)} />
        
               <input type="text" id="fileNumber" name="fileNumber" placeholder="File Number (Prefix : MDC)" className="input-field" 
                      value={fileNumber} onChange={(e) => setFileNumber(e.target.value)}/>
                         <select  id="location" name="location" className="input-field" 
                                  value={location} onChange={(e) => setLocation(e.target.value)} >
                                         <option>Select City</option> 
                                         <option value="Location 1">New Delhi</option>
                                         <option value="Location 2">Mumbai</option>
                          </select>
           
               <input type="date" id="dateOfBirth" name="dateOfBirth" placeholder="Date Of Birth" className="input-field" 
                      value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
              </div>
              <div className="gender-section">
                 <label>Gender:</label>
                 <label><input type="radio" id="genderMale" name="gender" 
                               value="Male" onChange={(e) => setGender(e.target.value)}/> Male</label> 

                 <label><input type="radio"  id="genderFemale" name="gender" 
                               value="Female" onChange={(e) => setGender(e.target.value)}/> Female</label>
              </div>
    
              <button className="save-button">Save</button>
            </form>
        </div>
      </div>
    </div>
     ); 
}; 

export default AdminDashboard;