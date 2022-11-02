const jwt = require('jsonwebtoken');

const verifyRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
};

module.exports = verifyRefreshToken;
