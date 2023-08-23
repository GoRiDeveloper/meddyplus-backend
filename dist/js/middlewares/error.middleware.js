"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const config_1 = require("../config/config");
const error_controller_1 = require("../controllers/error.controller");
const globalErrorHandler = (err, _req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';
    if (config_1.mode === config_1.modes.dev)
        (0, error_controller_1.sendErrorDev)(err, res);
    if (config_1.mode === config_1.modes.prod)
        (0, error_controller_1.sendErrorProd)(err, res);
};
exports.globalErrorHandler = globalErrorHandler;
