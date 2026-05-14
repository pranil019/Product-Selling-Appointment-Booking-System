const path = require("path");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const methodOverride = require("method-override");
const rateLimit = require("express-rate-limit");

const pageRoutes = require("./routes/pageRoutes");
const itemRoutes = require("./routes/itemRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  helmet({
    // Demo app uses some inline styles/scripts in EJS sometimes; relax CSP to avoid breaking pages.
    contentSecurityPolicy: false
  })
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: "draft-7",
    legacyHeaders: false
  })
);

app.use("/", pageRoutes);
app.use("/items", itemRoutes);
app.use("/appointments", appointmentRoutes);

app.use((req, res) => {
  res.status(404).render("pages/not-found", {
    title: "Page Not Found"
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render("pages/error", {
    title: "Server Error",
    message: error.message || "Something went wrong."
  });
});

module.exports = app;
