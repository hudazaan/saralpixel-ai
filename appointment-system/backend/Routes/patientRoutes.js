const express = require("express");
const { addPatient } = require("../controllers/patientController");
const router = express.Router();

router.post("/add", addPatient);

module.exports = router; 
