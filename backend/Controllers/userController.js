const validator = require("validator");
const cloudinary = require("cloudinary").v2;

const User = require("../Models/User");

const BigPromise = require("../Middleware/bigPromise");
const verifyRefreshToken = require("../Middleware/verifyRefreshToken");
const CustomError = require("../Utils/CustomError");
const cookieToken = require("../Utils/CookieToken");

exports.loginUser = BigPromise(async (req, res, next) => {
  const { email, mobile, password, userType } = req.body;

  if (!((email || mobile) && password && userType))
    return next(CustomError(res, "All fields are required", 400));

  if (userType !== "MOBILE" && userType !== "EMAIL")
    return next(CustomError(res, "Invalid user type", 400));

  let user;

  if (userType === "MOBILE") {
    user = await User.findOne({ mobile }).select("+password");
  } else {
    if (!validator.isEmail(email))
      return next(CustomError(res, "Invalid email", 400));

    user = await User.findOne({ email }).select("+password");
  }

  if (!user) {
    return next(CustomError(res, "Invalid credentials", 400));
  }

  const validPassword = await user.isPasswordValid(password);
  if (!validPassword) return next(CustomError(res, "Invalid credentials", 400));

  cookieToken(user, res);
});

exports.registerUser = BigPromise(async (req, res, next) => {
  const { email, mobile, password, name, username } = req.body;
  if (!(email || mobile) && !password && !name)
    return next(CustomError(res, "All fields are required", 400));

  const emailExists = await User.findOne({ email });
  const mobileExists = await User.findOne({ mobile });
  if (emailExists || mobileExists) {
    return next(CustomError(res, "User already exists", 400));
  }

  if (!validator.isEmail(email))
    return next(CustomError(res, "Invalid email", 400));

  if (password.length < 6)
    return next(
      CustomError(res, "Password must be at least 6 characters long", 400)
    );

  const user = await User.create({
    name,
    email,
    mobile,
    password,
    username,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      username: user.username,
    });
  } else {
    return next(CustomError(res, "Something went wrong", 500));
  }
});
