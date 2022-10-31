const express = require("express");

const home = require("../Controllers/homeController.js");

const router = express.Router();

router.route("/").get(home);

module.exports = router;
