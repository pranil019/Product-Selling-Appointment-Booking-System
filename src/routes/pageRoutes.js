const express = require("express");
const {
  loadHomePage,
  loadSellerDashboard,
  loadBuyerDashboard
} = require("../controllers/pageController");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(loadHomePage));
router.get("/seller/dashboard", asyncHandler(loadSellerDashboard));
router.get("/buyer/dashboard", asyncHandler(loadBuyerDashboard));
router.get("/dashboard", (req, res) => {
  res.redirect("/seller/dashboard");
});

module.exports = router;
