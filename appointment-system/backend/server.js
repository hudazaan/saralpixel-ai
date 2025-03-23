const express= require("express");
const cors= require("cors");
const dotenv= require("dotenv"); 
const connectDB= require("./Config/db"); 
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const patientRoutes = require("./routes/patientRoutes");

const app= express(); 

app.use(express.json()); 
app.use(cors({
    origin: "http://localhost:3000", // frontend requests
    credentials: true, 
  })); 

dotenv.config(); 
connectDB(); 



app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/patients", patientRoutes);

const PORT= process.env.PORT || 5000; 
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`); 
}); 


