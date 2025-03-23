const express = require("express");
const { addDoctor, getDoctor } = require("../controllers/doctorController");
const router = express.Router();

router.post("/add", addDoctor);
router.get("/", getDoctor);

module.exports = router;
