const express = require("express");
const {
  loadItemsPage,
  loadCreateItemPage,
  createItem,
  loadSingleItemPage
} = require("../controllers/itemController");

const router = express.Router();

router.get("/", loadItemsPage);
router.get("/new", loadCreateItemPage);
router.post("/", createItem);
router.get("/:id", loadSingleItemPage);

module.exports = router;
