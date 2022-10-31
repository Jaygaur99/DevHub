require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const httpsServer = require("http").createServer(app);

// Adding middleware
app.use(morgan("tiny"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
const corsOption = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOption));
app.use(helmet());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(compression());

// Adding Routes

// Socket.io configuration

exports.app = app;
exports.httpsServer = httpsServer;
