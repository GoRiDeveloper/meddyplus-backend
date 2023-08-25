"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
class AppError extends Error {
    statusCode;
    status;
    isOperational;
    errors;
    constructor(message, statusCode) {
        super(Array.isArray(message) ? errorMsgs_1.ERROR_MSGS.ERRORS : message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')
            ? errorMsgs_1.ERROR_MSGS.ERROR
            : errorMsgs_1.ERROR_MSGS.FAIL;
        this.isOperational = true;
        this.errors = Array.isArray(message) ? message : null;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
