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

exports.logoutUser = BigPromise(async (req, res, next) => {
  res
    .status(200)
    .cookie("access", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .cookie("refresh", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logout Successfull",
    });
});

exports.verifyEmail = BigPromise(async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(CustomError(res, "Email is required", 400));

  if (!validator.isEmail(email))
    return next(CustomError(res, "Email is not valid", 400));

  const user = await User.findOne({ email });

  if (!user) return next(CustomError(res, "Email is not registered", 400));

  res.status(200).json({
    success: true,
    message: "User is valid",
  });
});

exports.verifyMobile = BigPromise(async (req, res, next) => {
  const { mobile } = req.body;

  if (!mobile) return next(CustomError(res, "Mobile number is required", 400));

  const user = await User.findOne({ mobile });

  if (!user)
    return next(CustomError(res, "Mobile number is not registered", 400));

  res.status(200).json({
    success: true,
    message: "User is valid",
  });
});

exports.getAccessToken = BigPromise(async (req, res, next) => {
  const { refresh } = req.cookies;

  if (!refresh) return next(CustomError(res, "You are not authorized", 401));

  let isValidRefresh;
  try {
    isValidRefresh = verifyRefreshToken(refresh);
  } catch (error) {
    return next(CustomError(res, "Token expired ! Login Again", 400));
  }

  if (!isValidRefresh)
    return next(CustomError(res, "Token expired ! Login Again", 400));

  const user = await User.findOne({ user_id: isValidRefresh.user_id });

  if (!user) {
    return next(CustomError(res, "You are not authorized", 401));
  }

  const jwtAccessToken = await user.getAccessToken();

  const AccessOptions = {
    expires: new Date(
      Date.now() + process.env.ACCESS_COOKIE_EXPIRE_DAY * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  user.password = undefined;

  return res.status(200).cookie("access", jwtAccessToken, AccessOptions).json({
    success: true,
    user,
  });
});

exports.checkEmail = BigPromise(async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(CustomError(res, "Email is required", 400));

  if (!validator.isEmail(email))
    return next(CustomError(res, "Email is not valid", 400));

  const user = await User.findOne({ email });

  if (user) return next(CustomError(res, "Email already exits", 400));

  res.status(200).json({
    success: true,
    message: "Email doesnot exits",
  });
});

exports.checkMobile = BigPromise(async (req, res, next) => {
  const { mobile } = req.body;

  if (!mobile) return next(CustomError(res, "Mobile number is required", 400));

  const user = await User.findOne({ mobile });

  if (user) return next(CustomError(res, "Mobile number already exits", 400));

  res.status(200).json({
    success: true,
    message: "Mobile number doesnot exits",
  });
});

exports.authenticateUser = BigPromise(async (req, res, next) => {
  const { email, mobile, password, userType } = req.body;

  if (!((email || mobile) && password && userType))
    return next(CustomError(res, "All fields are required", 400));

  if (userType !== "MOBILE" && userType !== "EMAIL")
    return next(CustomError(res, "Invalid User", 400));

  let user;

  if (userType === "MOBILE") {
    user = await User.findOne({ mobile });
  } else if (userType === "EMAIL") {
    if (!validator.isEmail(email)) {
      return next(CustomError(res, "Invalid User", 400));
    }

    user = await User.findOne({ email });
  }

  if (user) return next(CustomError(res, "User already exits", 400));

  if (userType === "MOBILE") {
    user = await User.create({
      mobile,
      password: password,
    });
  } else if (userType === "EMAIL") {
    user = await User.create({
      email,
      password,
    });
  }

  cookieToken(user, res);
});

exports.checkUsername = BigPromise(async (req, res, next) => {
  const { username } = req.body;

  if (!username) return next(CustomError(res, "Username is required", 401));

  const user = await User.findOne({ username });

  if (user) return next(CustomError(res, "Username already exits", 401));

  res.status(200).json({
    success: true,
    message: "Username doesnot exits",
  });
});

exports.activateUser = BigPromise(async (req, res, next) => {
  const { name, avatar, username } = req.body;
  const { _id, activated } = req.user;

  if (activated) return next(CustomError(res, "User already activated", 400));

  if (!name || !avatar || !username)
    return next(CustomError(res, "All fields are required", 400));

  const newData = {
    name,
    username,
    activated: true,
  };

  try {
    if (!validator.isDataURI(avatar))
      return next(CustomError(res, "Profile Photo is not valid", 400));

    const cloudinaryPhoto = await cloudinary.uploader.upload(avatar, {
      folder: "devhouse",
      width: 250,
      crop: "fit",
    });

    newData.profile_photo = {
      id: cloudinaryPhoto.public_id,
      secure_url: cloudinaryPhoto.secure_url,
    };
  } catch (error) {
    console.log(error);

    return next(CustomError(res, "Internal Error", 400));
  }

  const user = await User.findByIdAndUpdate(_id, newData, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});
