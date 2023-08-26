"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathNotFound = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const pathNotFound = (req, res, _next) => {
    return res.status(httpCodes_1.HTTPCODES.NOT_FOUND).json({
        status: errorMsgs_1.ERROR_MSGS.FAIL,
        message: `La ruta ${req.originalUrl} no se encontró.`
    });
};
exports.pathNotFound = pathNotFound;
