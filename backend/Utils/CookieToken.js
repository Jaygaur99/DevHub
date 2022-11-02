/*
    FLOW ->
    generate access and refresh token
    send refresh token in cookie and access token in json
    store access token in cookkie and refresh token in cookie
    send access to verify protected routes
    if acess token expires send request with refresh token to ask access token
*/

const cookieToken = async (user, res) => {
  const accessJwtToken = await user.getAccessToken();
  const refreshJwtToken = await user.getRefreshToken();

  const refreshCookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  const accessCookieOptions = {
    expires: new Date(Date.now() + 30 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  user.password = undefined;
  // console.log(refreshJwtToken, refreshCookieOptions, accessJwtToken, accessCookieOptions);
  return res
    .status(200)
    .cookie("refresh", refreshJwtToken, refreshCookieOptions)
    .cookie("access", accessJwtToken, accessCookieOptions)
    .json({
      success: true,
      user,
    });
};

module.exports = cookieToken;
