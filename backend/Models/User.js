const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');
const uuid = require('uuid').v4;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, 'Email is not valid'],
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
        minlength: [6, 'Password should be a minimum length of 6'],
        select: false,
        required: [true],
    },
    user_id: {
        type: String,
        default: uuid,
        unique: true,
    },
    activated: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        maxlength: [40],
    },
    username: {
        type: String,
        maxlength: [40],
    },
    profile_photo: {
        id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpiry: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordValid = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

userSchema.methods.getRefreshToken = function () {
    return jwt.sign({ user_id: this.user_id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: 300000,
    });
};

userSchema.methods.getAccessToken = async function () {
    return jwt.sign({ user_id: this.user_id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: 300000,
    });
};

userSchema.methods.getForgotPasswordToken = async function () {
    const forgotPassword = await crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken = await crypto
        .createHash('sha256')
        .update(forgotPassword)
        .digest('hex');

    this.forgotPasswordExpiry =
        Date.now() + process.env.FORGOT_PASSWORD_EXPIRY * 60 * 1000;

    return forgotPassword;
};

module.exports = mongoose.model('user', userSchema);
