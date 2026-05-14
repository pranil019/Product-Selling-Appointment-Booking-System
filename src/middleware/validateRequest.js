const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query
  });

  if (!result.success) {
    const message = result.error.issues.map((i) => i.message).join(" ");
    return res.status(400).render("pages/error", {
      title: "Validation Error",
      message: message || "Invalid request."
    });
  }

  // Provide sanitized/typed data for controllers.
  req.validated = result.data;
  next();
};

module.exports = validateRequest;

