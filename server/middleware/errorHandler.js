module.exports = (error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    const validation = error.validation;
    console.log(error)
    res.status(status).json({
        message,
        data,
        validation
    });
};
