const express = require("express");
const {
  loadItemsPage,
  loadCreateItemPage,
  createItem,
  loadSingleItemPage
} = require("../controllers/itemController");
const asyncHandler = require("../middleware/asyncHandler");
const validateRequest = require("../middleware/validateRequest");
const { validateObjectIdParam } = require("../middleware/validateObjectId");
const { createItemSchema } = require("../validators/itemValidators");

const router = express.Router();

router.get("/", asyncHandler(loadItemsPage));
router.get("/new", loadCreateItemPage);
router.post("/", validateRequest(createItemSchema), asyncHandler(createItem));
router.get("/:id", validateObjectIdParam("id"), asyncHandler(loadSingleItemPage));

module.exports = router;
