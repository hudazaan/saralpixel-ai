const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: { 
  type: String, required: true }, 
  date: String,
  availableTimings: {
    morning: [String],
    evening: [String],
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema); 

