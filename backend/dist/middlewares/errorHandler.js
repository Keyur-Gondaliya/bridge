"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    if (err.isOperational) {
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
    else {
        console.error("Unexpected Error:", err);
        res
            .status(500)
            .json({ success: false, message: "An unexpected error occurred." });
    }
};
exports.default = errorHandler;
