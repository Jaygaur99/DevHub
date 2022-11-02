const BigPromise = require('../Middleware/bigPromise');
const CustomError = require('../Utils/CustomError');
const CodeBox = require('../Models/Codebox');
const uuid = require('uuid').v4;
const { toDataURL } = require('qrcode');
const cloudinary = require('cloudinary').v2;

const {
    executePythonCode,
    executeCppCode,
    executeJSCode,
} = require('../Utils/CodeRunner');

exports.createBox = BigPromise(async (req, res, next) => {
    const { room_name, language } = req.body;
    const { _id } = req.user;

    if (!room_name || !language)
        return next(CustomError(res, 'All fields are required', 400));

    if (
        language !== 'JAVASCRIPT' &&
        language !== 'TYPESCRIPT' &&
        language !== 'CPP' &&
        language !== 'PYTHON' &&
        language !== 'REACT' &&
        language !== 'REACT TYPESCRIPT'
    )
        return next(CustomError(res, 'Language is not valid', 400));

    let codeboxRoom = await CodeBox.findOne({ name: room_name });

    if (codeboxRoom)
        return next(
            CustomError(res, 'Codebox room already exists with name', 400),
        );

    const codebox_id = uuid();
    const qrLink = {
        id: '',
        secure_url: '',
    };

    await toDataURL(
        `Join the codebox room on ${process.env.CLIENT_URL}/code-box/${codebox_id} \n Join with code-box room Id : ${codebox_id} `,
    )
        .then(async (url) => {
            const cloudinaryPhoto = await cloudinary.uploader
                .upload(url, {
                    folder: 'devhouse',
                    width: 250,
                    crop: 'fit',
                })
                .catch(() => next(CustomError(res, 'Internal Error', 400)));

            qrLink.id = cloudinaryPhoto.public_id;
            qrLink.secure_url = cloudinaryPhoto.secure_url;
        })
        .catch(() => next(CustomError(res, 'Internal Error', 400)));

    codeboxRoom = await CodeBox.create({
        name: room_name,
        codebox_id,
        creator: _id,
        language,
        qrcode: qrLink,
    });

    codeboxRoom = await codeboxRoom.populate(
        'creator',
        'email mobile user_id _id name username profile_photo',
    );

    res.status(200).json({
        success: true,
        room: codeboxRoom,
    });
});

exports.joinBox = BigPromise(async (req, res, next) => {
    const { boxId } = req.params;

    if (!boxId) return next(CustomError(res, 'Room Id is not valid', 400));

    const codeBoxRoom = await CodeBox.findOne({ codebox_id: boxId }).populate(
        'creator',
        'email mobile user_id _id name username profile_photo',
    );

    if (!codeBoxRoom)
        return next(CustomError(res, 'Room Id is not valid', 400));

    res.status(200).json({
        success: true,
        room: codeBoxRoom,
    });
});

exports.runCode = BigPromise(async (req, res, next) => {
    const { language, code, input } = req.body;

    if (!language || !code)
        return next(CustomError(res, 'All fields are required', 400));

    if (language !== 'CPP' && language !== 'PYTHON')
        return next(CustomError(res, 'Language not supported', 400));

    let message;

    if (language === 'PYTHON') {
        message = await executePythonCode(code, input);
    } else {
        message = 'Language not supported';
    }

    res.status(200).json({
        success: true,
        message,
    });
});
