module.exports = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch((err) => {
    console.log(err);
    next(
      res.status(403).json({
        success: false,
        message: "Internal Server Error",
      })
    );
  });
