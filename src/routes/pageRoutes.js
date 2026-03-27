const express = require("express");
const {
  loadHomePage,
  loadSellerDashboard,
  loadBuyerDashboard
} = require("../controllers/pageController");

const router = express.Router();

router.get("/", loadHomePage);
router.get("/seller/dashboard", loadSellerDashboard);
router.get("/buyer/dashboard", loadBuyerDashboard);
router.get("/dashboard", (req, res) => {
  res.redirect("/seller/dashboard");
});

module.exports = router;
