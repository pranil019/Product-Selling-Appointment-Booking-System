const Appointment = require("../models/Appointment");
const Item = require("../models/Item");

const createAppointment = async (req, res) => {
  const item = await Item.findById(req.params.itemId);

  if (!item) {
    return res.status(404).render("pages/not-found", {
      title: "Item Not Found"
    });
  }

  await Appointment.create({
    item: item._id,
    buyerName: req.body.buyerName,
    buyerEmail: req.body.buyerEmail,
    phone: req.body.phone,
    appointmentDate: req.body.appointmentDate,
    message: req.body.message
  });

  res.redirect(`/buyer/dashboard?email=${encodeURIComponent(req.body.buyerEmail)}`);
};

const updateAppointmentStatus = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate("item");

  if (!appointment) {
    return res.status(404).render("pages/not-found", {
      title: "Appointment Not Found"
    });
  }

  await Appointment.findByIdAndUpdate(req.params.id, {
    status: req.body.status,
    sellerResponse: req.body.sellerResponse || ""
  });

  const sellerEmail = appointment.item ? appointment.item.sellerEmail : "";
  res.redirect(`/seller/dashboard?email=${encodeURIComponent(sellerEmail)}`);
};

module.exports = {
  createAppointment,
  updateAppointmentStatus
};
