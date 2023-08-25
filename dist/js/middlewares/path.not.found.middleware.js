"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathNotFound = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const pathNotFound = (req, res, _next) => {
    return res.status(404).json({
        status: errorMsgs_1.ERROR_MSGS.FAIL,
        message: `La ruta ${req.originalUrl} no se encontró.`
    });
};
exports.pathNotFound = pathNotFound;
