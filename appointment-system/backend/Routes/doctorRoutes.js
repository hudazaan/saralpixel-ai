const express = require("express");
const { createDoctor, getDoctor } = require("../controllers/doctorController");
const router = express.Router();

router.post("/", createDoctor); 
router.get("/", getDoctor);

module.exports = router;