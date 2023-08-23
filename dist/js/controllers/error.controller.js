"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorProd = exports.sendErrorDev = void 0;
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
        status: 'fail',
        message: 'Algo Salio Mal :('
    });
};
exports.sendErrorProd = sendErrorProd;
