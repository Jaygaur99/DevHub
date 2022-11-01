const mongoose = require("mongoose");
const uuid = require("uuid").v4;
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [50, "Room name cannot exceed 50 characters"],
    required: [true, "Please enter room name"],
  },
  room_id: {
    type: String,
    default: uuid,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: {
      values: ["OPEN", "SOCIAL", "PRIVATE"],
      message: "Please select a valid room type",
    },
  },
  speakers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  ],
  qrcode: {
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  password: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

roomSchema.pre("remove", async function () {
  await cloudinary.uploader.destroy(this.qrcode.id);
});

roomSchema.pre("save", async function (next) {
  if (this.type === "OPEN") {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

roomSchema.methods.isPasswordValid = async function (newPassword) {
  return await bcrypt.compare(newPassword, this.password);
};

module.exports = mongoose.model("room", roomSchema);
