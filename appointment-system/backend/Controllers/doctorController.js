/* 
const Doctor = require("../models/doctorModel");

const addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error adding doctor" });
  }
};

const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOne();
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor" });
  }
};

module.exports = { addDoctor, getDoctor };
*/ 

const Doctor = require("../models/doctorModel");

const createDoctor = async (req, res) => {
  try {
    console.log("Incoming doctor data:", req.body);
    const { name, specialization, gender, timings } = req.body; 

    if (!name || !specialization || !gender) { 
      return res.status(400).json({ 
        message: "Name, specialization, and gender are required" 
      });
    }

    if (timings && timings.length > 0) {
      for (const timing of timings) {
        if (!timing.day || !timing.morningStart || !timing.morningEnd || 
            !timing.eveningStart || !timing.eveningEnd) {
          return res.status(400).json({ 
            message: "All timing fields (day, morningStart, morningEnd, eveningStart, eveningEnd) are required" 
          });
        }
      }
    }

    const doctor = new Doctor({
      name,
      specialization,
      gender, 
      timings: timings || []
    });  
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ 
      message: "Error creating doctor",
      error: error.message 
    });
  }
};

const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.find();
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error: error.message });
  }
};

module.exports = { createDoctor, getDoctor };