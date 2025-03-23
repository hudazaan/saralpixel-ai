const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobile: String,
  fileNumber: String,
  location: String,
  dateOfBirth: Date,
  gender: String,
});

module.exports = mongoose.model("Patient", patientSchema);