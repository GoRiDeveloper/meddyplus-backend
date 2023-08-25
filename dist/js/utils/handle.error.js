"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpError = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpError = (err, _req, res, _next) => {
    console.log(err);
    return res.status(500).json({
        status: errorMsgs_1.ERROR_MSGS.ERROR,
        message: errorMsgs_1.ERROR_MSGS.GENERIC_ERROR
    });
};
exports.httpError = httpError;
