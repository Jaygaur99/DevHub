const CustomError = (res, errorMessage, statusCode) => {
    res.status(statusCode).json({
        success: false,
        message: errorMessage,
    });
};

module.exports = CustomError;
