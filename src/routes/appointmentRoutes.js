const express = require("express");
const {
  createAppointment,
  updateAppointmentStatus
} = require("../controllers/appointmentController");
const asyncHandler = require("../middleware/asyncHandler");
const validateRequest = require("../middleware/validateRequest");
const { validateObjectIdParam } = require("../middleware/validateObjectId");
const {
  createAppointmentSchema,
  updateAppointmentStatusSchema
} = require("../validators/appointmentValidators");

const router = express.Router();

router.post(
  "/:itemId",
  validateObjectIdParam("itemId"),
  validateRequest(createAppointmentSchema),
  asyncHandler(createAppointment)
);
router.patch(
  "/:id/status",
  validateObjectIdParam("id"),
  validateRequest(updateAppointmentStatusSchema),
  asyncHandler(updateAppointmentStatus)
);

module.exports = router;
