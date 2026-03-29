const Appointment = require("../models/Appointment");
const Item = require("../models/Item");
const { fetchExternalListings } = require("../utils/externalListings");

const loadHomePage = async (req, res) => {
  const [featuredItems, latestAppointments, stats] = await Promise.all([
    Item.find().sort({ createdAt: -1 }).limit(6),
    Appointment.find().populate("item").sort({ createdAt: -1 }).limit(5),
    Promise.all([
      Item.countDocuments(),
      Appointment.countDocuments(),
      Item.countDocuments({ status: "Available" })
    ])
  ]);

  res.render("pages/home", {
    title: "BookIt",
    featuredItems,
    latestAppointments,
    stats: {
      totalItems: stats[0],
      totalAppointments: stats[1],
      availableItems: stats[2]
    }
  });
};

const loadSellerDashboard = async (req, res) => {
  const sellerEmail = req.query.email || "";
  let listings = [];
  let appointments = [];

  if (sellerEmail) {
    listings = await Item.find({ sellerEmail }).sort({ createdAt: -1 });
    const sellerItemIds = listings.map((item) => item._id);

    appointments = await Appointment.find({
      item: { $in: sellerItemIds }
    })
      .populate("item")
      .sort({ appointmentDate: 1 });
  }

  res.render("pages/seller-dashboard", {
    title: "Seller Dashboard",
    sellerEmail,
    listings,
    appointments
  });
};

const loadBuyerDashboard = async (req, res) => {
  const buyerEmail = req.query.email || "";
  let appointments = [];

  if (buyerEmail) {
    appointments = await Appointment.find({ buyerEmail })
      .populate("item")
      .sort({ createdAt: -1 });
  }

  const globalListings = await fetchExternalListings();

  res.render("pages/buyer-dashboard", {
    title: "Buyer Dashboard",
    buyerEmail,
    appointments,
    globalListings
  });
};

module.exports = {
  loadHomePage,
  loadSellerDashboard,
  loadBuyerDashboard
};
