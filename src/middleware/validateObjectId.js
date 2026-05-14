const mongoose = require("mongoose");

const validateObjectIdParam = (paramName) => (req, res, next) => {
  const value = req.params[paramName];
  if (!mongoose.isValidObjectId(value)) {
    return res.status(400).render("pages/error", {
      title: "Bad Request",
      message: `Invalid ${paramName}.`
    });
  }
  next();
};

module.exports = {
  validateObjectIdParam
};

