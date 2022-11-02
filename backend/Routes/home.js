const router = require('express').Router();

const { homeWelcome } = require('../Controllers/homeController');

router.route('/').get(homeWelcome);
// router.route('/').get(home);

module.exports = router;
