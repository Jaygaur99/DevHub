const router = require('express').Router();

const isLoggedIn = require('../Middleware/isLoggedIn');

const {
    createBox,
    joinBox,
    runCode,
} = require('../Controllers/codeboxController');

router.route('/codebox/create').post(isLoggedIn, createBox);
router.route('/codebox/join/:boxId').get(isLoggedIn, joinBox);
router.route('/codebox/run').post(isLoggedIn, runCode);

module.exports = router;
