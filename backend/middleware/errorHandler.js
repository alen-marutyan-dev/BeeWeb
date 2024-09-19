const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    } else {
        console.error(err.message);
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        errorId: err.errorId || null,
    });

    next(err);
};

module.exports = errorHandler;
