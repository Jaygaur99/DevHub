exports.homeWelcome = (req, res) => {
    res.status(200).json({
        success: true,
        body: 'Hello and working',
    });
};
