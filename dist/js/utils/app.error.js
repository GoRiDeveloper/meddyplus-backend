"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    status;
    isOperational;
    errors;
    constructor(message, statusCode) {
        super(Array.isArray(message) ? 'errors' : message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
        this.isOperational = true;
        this.errors = Array.isArray(message) ? message : null;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
