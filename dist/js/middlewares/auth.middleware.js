"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.protect = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const entities_factory_1 = require("../services/factory/entities.factory");
const app_error_1 = require("../utils/app.error");
const jwt_1 = require("../utils/jwt");
const protect = async (req, _res, next) => {
    let token;
    if (req.headers?.authorization &&
        req.headers.authorization?.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
    if (!token) {
        next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.SESSION_NOT_STARTED, httpCodes_1.HTTPCODES.UNAUTHORIZED));
        return;
    }
    let decoded;
    try {
        decoded = (await (0, jwt_1.verifyJWT)(token));
    }
    catch (err) {
        next(err);
        return;
    }
    if (!decoded) {
        next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.TOKEN_NOT_DECODED, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
        return;
    }
    const attributes = {
        password: false,
        status: false
    };
    const userExists = await entities_factory_1.userService.findUser({ id: decoded.id }, attributes, false, false);
    if (!userExists) {
        next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.TOKEN_USER_NOT_FOUND, httpCodes_1.HTTPCODES.NOT_FOUND));
        return;
    }
    if (userExists.passwordChangedAt) {
        const convertToSeconds = userExists.passwordChangedAt.getTime() / 1000;
        const changedTimeStamp = parseInt(convertToSeconds.toString(), 10);
        if (decoded.iat < changedTimeStamp) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.USER_PASSWORD_CHANGE, httpCodes_1.HTTPCODES.UNAUTHORIZED));
            return;
        }
    }
    req.sessionUser = userExists;
    next();
};
exports.protect = protect;
const restrictTo = (...roles) => {
    return (req, _res, next) => {
        if (!roles.includes(req.sessionUser?.role)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PERMISSION_DENIAD, httpCodes_1.HTTPCODES.FORBIDDEN));
            return;
        }
        next();
    };
};
exports.restrictTo = restrictTo;
