"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const config_1 = require("../config/config");
const globalErrorHandler = (err, _req, res) => {
    err.statusCode = err.statusCode || httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR;
    err.status = err.status || errorMsgs_1.ERROR_MSGS.FAIL;
    if (config_1.mode === config_1.modes.dev)
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            err
        });
    if (config_1.mode === config_1.modes.prod) {
        if (err.isOperational)
            return res.status(err.statusCode).json({
                status: err.status,
                ...(err.message && { message: err.message }),
                ...(err.errors && { errors: err.errors })
            });
        return res.status(httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR).json({
            status: errorMsgs_1.ERROR_MSGS.FAIL,
            message: errorMsgs_1.ERROR_MSGS.GENERIC_ERROR
        });
    }
};
exports.globalErrorHandler = globalErrorHandler;
