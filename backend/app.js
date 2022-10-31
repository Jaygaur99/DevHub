require("dotenv").config();
const express = require("express");
const app = express();
const httpsServer = require("http").createServer(app);
const cors = require("cors");

const corsOption = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOption));

exports.app = app;
exports.httpsServer = httpsServer;
