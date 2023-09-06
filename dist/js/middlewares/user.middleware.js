"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateYourUser = exports.userExists = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const services_1 = require("../services");
const user_types_1 = require("../types/user.types");
const app_error_1 = require("../utils/app.error");
const userExists = async (req, _res, next) => {
    const { id } = req.safeData?.params;
    const filters = { id, status: user_types_1.UserStatus.enable };
    try {
        const user = (await services_1.userService.findUser(filters, false, false, false));
        if (!user)
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.USER_NOT_FOUND, httpCodes_1.HTTPCODES.NOT_FOUND);
        req.user = user;
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.USER_NOT_FOUND, httpCodes_1.HTTPCODES.NOT_FOUND));
            return;
        }
        next(err);
        return;
    }
    next();
};
exports.userExists = userExists;
const validateYourUser = (req, _res, next) => {
    const yourUserId = req.sessionUser?.id;
    const userId = req.user?.id;
    if (yourUserId !== userId) {
        next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.ACTION_RECTRICTED_TO_OWNER, httpCodes_1.HTTPCODES.FORBIDDEN));
        return;
    }
    next();
};
exports.validateYourUser = validateYourUser;
