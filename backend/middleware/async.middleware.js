/**
 * @desc    Wrapper for async/await error handling
 * @usage   Wrap all async route handlers with this
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;