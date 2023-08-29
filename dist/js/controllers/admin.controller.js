"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDoctorsAndAdmins = exports.cancelDoctorsAndAdminsRegistration = exports.approveDoctorsAndAdminsRegistration = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const msgs_1 = require("../constants/msgs");
const entities_factory_1 = require("../services/factory/entities.factory");
const app_error_1 = require("../utils/app.error");
const approveDoctorsAndAdminsRegistration = async (req, res, next) => {
    try {
        const { userId } = req.safeData?.params;
        const updatedUser = await entities_factory_1.userService.approveAdminDocsRegistration(userId);
        return res.status(httpCodes_1.HTTPCODES.OK).json({
            status: msgs_1.MESSAGES.SUCCESS,
            message: msgs_1.MESSAGES.ADMIN_REGISTRATION_APPROVAL_OK,
            updatedUser
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.ADMIN_REGISTRATION_APPROVAL_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.approveDoctorsAndAdminsRegistration = approveDoctorsAndAdminsRegistration;
const cancelDoctorsAndAdminsRegistration = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const canceledUser = await entities_factory_1.userService.cancelAdminDocsRegistration(Number(userId));
        if (canceledUser == null) {
            return res.status(httpCodes_1.HTTPCODES.BAD_REQUEST).json({
                status: errorMsgs_1.ERROR_MSGS.FAIL,
                message: errorMsgs_1.ERROR_MSGS.ADMIN_REGISTRATION_CANCELATION_FAIL,
                canceledUser
            });
        }
        return res.status(httpCodes_1.HTTPCODES.OK).json({
            status: msgs_1.MESSAGES.SUCCESS,
            message: msgs_1.MESSAGES.ADMIN_REGISTRATION_CANCELATION_OK,
            canceledUser
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.ADMIN_REGISTRATION_CANCELATION_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.cancelDoctorsAndAdminsRegistration = cancelDoctorsAndAdminsRegistration;
const getAllDoctorsAndAdmins = async (req, res, next) => {
    try {
        const requesterId = req.sessionUser?.id;
        const [users, count] = await entities_factory_1.userService.findAllDoctorsAndAdmins(requesterId);
        return res.status(httpCodes_1.HTTPCODES.OK).json({
            status: msgs_1.MESSAGES.SUCCESS,
            users,
            count
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.GET_DOCTORS_AND_ADMINS_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.getAllDoctorsAndAdmins = getAllDoctorsAndAdmins;
