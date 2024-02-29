const { HTTP_STATUS } = require('../utils/HTTP_STATUS');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case HTTP_STATUS.VALIDATION_ERROR:
            res.status(HTTP_STATUS.VALIDATION_ERROR).json({
                title: "Validation failed",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case HTTP_STATUS.NOT_FOUND:
            res.status(HTTP_STATUS.NOT_FOUND).json({
                title: "Not found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case HTTP_STATUS.UNAUTHORIZED:
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case HTTP_STATUS.FORBIDDEN:
            res.status(HTTP_STATUS.FORBIDDEN).json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case HTTP_STATUS.SERVER_ERROR:
            res.status(HTTP_STATUS.SERVER_ERROR).json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            console.log("All Good, No Error");
            break;
    }
}

module.exports = errorHandler;
