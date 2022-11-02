module.exports = (func) => (req, res, next) =>
    Promise.resolve(func(req, res, next)).catch((error) => {
        console.log(error);
        next(
            res.status(403).json({
                success: false,
                message: 'Internal Error',
            }),
        );
    });
