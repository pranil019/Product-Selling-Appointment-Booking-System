// Express 4 does not automatically route async errors to error middleware.
// Wrap async handlers so rejections go to next(err).
const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

module.exports = asyncHandler;

