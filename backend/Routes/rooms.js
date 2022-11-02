const router = require('express').Router();

const isLoggedIn = require('../Middleware/isLoggedIn');

const {
    createRoom,
    getRooms,
    singleRoom,
    verifyRoomPassword,
} = require('../Controllers/roomsController');

router.route('/room/create').post(isLoggedIn, createRoom);
router.route('/room/rooms').get(getRooms);
router.route('/room/single/:roomId').get(isLoggedIn, singleRoom);
router.route('/room/verify/:roomId').post(isLoggedIn, verifyRoomPassword);

module.exports = router;
