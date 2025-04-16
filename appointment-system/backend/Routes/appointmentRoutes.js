const express = require("express");
const { createAppointment, getAppointmentsByDate} = require("../controllers/appointmentController");
const router = express.Router();

router.post("/add", createAppointment);
router.get("/by-date", getAppointmentsByDate);


module.exports = router;
