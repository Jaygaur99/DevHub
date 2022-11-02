const mongoose = require('mongoose');
const uuid = require('uuid').v4;
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;

const roomsSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [40, 'Room Name Cannnot be greater than 40 character'],
        required: [true],
    },
    room_id: {
        type: String,
        default: uuid,
        required: [true],
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true],
    },
    type: {
        type: String,
        required: [true],
        enum: {
            values: ['OPEN', 'SOCIAL', 'PRIVATE'],
            message: `Please Select Category From- "OPEN", "SOCIAL", "PRIVATE"`,
        },
    },
    speakers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
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

roomsSchema.pre('remove', async function () {
    await cloudinary.uploader.destroy(this.qrcode.id);
});

roomsSchema.pre('save', async function (next) {
    if (this.type === 'OPEN') {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

roomsSchema.methods.isPasswordValid = async function (roomPassword) {
    return await bcrypt.compare(roomPassword, this.password);
};

module.exports = mongoose.model('rooms', roomsSchema);
