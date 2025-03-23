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
