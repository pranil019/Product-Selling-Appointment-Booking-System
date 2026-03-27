const express = require("express");
const {
  createAppointment,
  updateAppointmentStatus
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/:itemId", createAppointment);
router.patch("/:id/status", updateAppointmentStatus);

module.exports = router;
