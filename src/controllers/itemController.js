const Item = require("../models/Item");

const loadItemsPage = async (req, res) => {
  const filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.status) {
    filter.status = req.query.status;
  }

  const items = await Item.find(filter).sort({ createdAt: -1 });

  res.render("pages/items/index", {
    title: "Browse Listings",
    items,
    filters: req.query
  });
};

const loadCreateItemPage = (req, res) => {
  res.render("pages/items/new", {
    title: "Create Listing",
    formData: {}
  });
};

const createItem = async (req, res) => {
  const item = await Item.create(req.body);
  res.redirect(`/seller/dashboard?email=${encodeURIComponent(item.sellerEmail)}`);
};

const loadSingleItemPage = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return res.status(404).render("pages/not-found", {
      title: "Item Not Found"
    });
  }

  res.render("pages/items/show", {
    title: item.title,
    item
  });
};

module.exports = {
  loadItemsPage,
  loadCreateItemPage,
  createItem,
  loadSingleItemPage
};
