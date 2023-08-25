"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const config_1 = require("../config/config");
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const error_controller_1 = require("../controllers/error.controller");
const globalErrorHandler = (err, _req, res) => {
    err.statusCode = err.statusCode || httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR;
    err.status = err.status || errorMsgs_1.ERROR_MSGS.FAIL;
    if (config_1.mode === config_1.modes.dev)
        (0, error_controller_1.sendErrorDev)(err, res);
    if (config_1.mode === config_1.modes.prod)
        (0, error_controller_1.sendErrorProd)(err, res);
};
exports.globalErrorHandler = globalErrorHandler;
