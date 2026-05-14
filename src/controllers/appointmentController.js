const Appointment = require("../models/Appointment");
const Item = require("../models/Item");

const createAppointment = async (req, res) => {
  const itemId = req.validated?.params?.itemId || req.params.itemId;
  const body = req.validated?.body || req.body;

  const item = await Item.findById(itemId);

  if (!item) {
    return res.status(404).render("pages/not-found", {
      title: "Item Not Found"
    });
  }

  await Appointment.create({
    item: item._id,
    buyerName: body.buyerName,
    buyerEmail: body.buyerEmail,
    phone: body.phone,
    appointmentDate: body.appointmentDate,
    message: body.message
  });

  res.redirect(`/buyer/dashboard?email=${encodeURIComponent(body.buyerEmail)}`);
};

const updateAppointmentStatus = async (req, res) => {
  const id = req.validated?.params?.id || req.params.id;
  const body = req.validated?.body || req.body;

  const appointment = await Appointment.findById(id).populate("item");

  if (!appointment) {
    return res.status(404).render("pages/not-found", {
      title: "Appointment Not Found"
    });
  }

  await Appointment.findByIdAndUpdate(id, {
    status: body.status,
    sellerResponse: body.sellerResponse || ""
  });

  const sellerEmail = appointment.item ? appointment.item.sellerEmail : "";
  res.redirect(`/seller/dashboard?email=${encodeURIComponent(sellerEmail)}`);
};

module.exports = {
  createAppointment,
  updateAppointmentStatus
};
