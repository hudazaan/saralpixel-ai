const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  timings: [
    {
      day: String,
      morningStart: String,
      morningEnd: String,
      eveningStart: String,
      eveningEnd: String,
    },
  ],
});

module.exports = mongoose.model("Doctor", doctorSchema);
