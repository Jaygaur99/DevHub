const CustomError = require("../Utils/CustomError");
const BigPromise = require("../Middleware/bigPromise");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const isLoggedIn = BigPromise(async (req, res, next) => {
  let accessToken = req.cookies?.access;

  if (!accessToken && req.header("Authorization"))
    accessToken = req.header("Authorization").replace("Bearer", "");

  if (accessToken === undefined)
    return CustomError(res, "Login to procced", 401);

  let decoded;

  try {
    decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    return CustomError(res, "Login to procced", 401);
  }

  if (!decoded) return CustomError(res, "Login to procced", 401);

  const user = await User.findOne({ user_id: decoded.user_id });

  if (!user) return CustomError(res, "Login to procced", 401);

  req.user = user;

  next();
});

module.exports = isLoggedIn;
