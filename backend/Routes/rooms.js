const router = require("express").Router();

const isLoggedIn = require("../Middleware/isLoggedIn.js");

const {
  createRoom,
  getRooms,
  singleRoom,
  verifyRoomPassword,
} = require("../Controllers/roomsControllers.js");

router.route("/create").post(isLoggedIn, createRoom);
router.route("/rooms").get(getRooms);
router.route("/single/:roomId").get(isLoggedIn, singleRoom);
router.route("/verify/:roomId").post(isLoggedIn, verifyRoomPassword);

module.exports = router;
