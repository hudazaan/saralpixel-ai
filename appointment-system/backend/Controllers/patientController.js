const Patient = require("../models/patientModel");

const addPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error adding patient" });
  }
};

module.exports = { addPatient };