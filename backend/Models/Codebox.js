const mongoose = require('mongoose');
const uuid = require('uuid').v4;
const cloudinary = require('cloudinary').v2;

const codeboxSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [50, 'Name cannot be greater than 50 char'],
        required: [true, 'Name is required'],
    },
    codebox_id: {
        type: String,
        default: uuid,
        required: [true, 'Codebox Id is required'],
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Creator is required'],
    },
    codebox_type: {
        type: String,
        enum: {
            values: ['LIBRARY', 'LANGUAGE'],
            message: 'Type is not valid',
        },
    },
    language: {
        type: String,
        required: [true, 'Language is required'],
        enum: {
            values: [
                'JAVASCRIPT',
                'TYPESCRIPT',
                'CPP',
                'PYTHON',
                'REACT',
                'REACT TYPESCRIPT',
            ],
        },
    },
    qrcode: {
        id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 432000,
    },
});

codeboxSchema.pre('remove', async function () {
    await cloudinary.uploader.destroy(this.qrcode.id);
});

codeboxSchema.pre('save', async function (next) {
    if (
        this.language === 'JAVASCRIPT' ||
        this.language === 'TYPESCRIPT' ||
        this.language === 'CPP' ||
        this.language === 'PYTHON'
    ) {
        this.codebox_type = 'LANGUAGE';
        return next();
    }

    this.codebox_type = 'LIBRARY';
});

module.exports = mongoose.model('codebox', codeboxSchema);
