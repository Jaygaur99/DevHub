const router = require('express').Router();

const isLoggedIn = require('../Middleware/isLoggedIn');

const {
    checkEmail,
    checkMobile,
    authenticateUser,
    getAccessToken,
    checkUsername,
    activateUser,
    verifyEmail,
    loginUser,
    logoutUser,
    verifyMobile,
} = require('../Controllers/userController');

router.route('/verify/email').post(checkEmail);
router.route('/verify/mobile').post(checkMobile);
router.route('/verify/username').post(checkUsername);
router.route('/user/authenticate').post(authenticateUser);
router.route('/user/activate').post(isLoggedIn, activateUser);
router.route('/user/email').post(verifyEmail);
router.route('/user/mobile').post(verifyMobile);
router.route('/user/login').post(loginUser);
router.route('/user/logout').get(isLoggedIn, logoutUser);

router.route('/refresh').get(getAccessToken);

module.exports = router;
