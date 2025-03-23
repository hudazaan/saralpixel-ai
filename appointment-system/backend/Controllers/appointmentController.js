const Appointment = require("../models/appointmentModel");

const createAppointment = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    const { doctorId, date, availableTimings } = req.body;
    if (!doctorId || !date || !availableTimings?.morning || !availableTimings?.evening) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!Array.isArray(availableTimings.morning) || !Array.isArray(availableTimings.evening)) {  //array format 
      return res.status(400).json({ message: "Invalid timings format" });  
    }

    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Error creating appointment" });
  }
};

const getAppointmentsByDate = async (req, res) => {       //date-based fetching 
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const appointments = await Appointment.find({ date });      //finding all appointments  

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for the selected date" });
    }

    const morningTimings = appointments.flatMap(app => app.availableTimings.morning || []);    //extracting morning-evening from all appointments
    const eveningTimings = appointments.flatMap(app => app.availableTimings.evening || []);

    res.json({
      morning: morningTimings,
      evening: eveningTimings,       //response->morning-evening
    });
  } catch (error) {
    console.error("Error fetching appointments by date:", error);
    res.status(500).json({ message: "Error fetching appointments by date" });
  }
};

module.exports = { createAppointment, getAppointmentsByDate };


 