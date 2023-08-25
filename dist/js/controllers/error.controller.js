"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorProd = exports.sendErrorDev = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const sendErrorDev = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        err
    });
};
exports.sendErrorDev = sendErrorDev;
const sendErrorProd = (err, res) => {
    if (err.isOperational)
        return res.status(err.statusCode).json({
            status: err.status,
            ...(err.message && { message: err.message }),
            ...(err.errors && { errors: err.errors })
        });
    return res.status(500).json({
        status: errorMsgs_1.ERROR_MSGS.FAIL,
        message: errorMsgs_1.ERROR_MSGS.GENERIC_ERROR
    });
};
exports.sendErrorProd = sendErrorProd;
