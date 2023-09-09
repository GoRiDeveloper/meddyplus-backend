"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctors = void 0;
const app_error_1 = require("../utils/app.error");
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const services_1 = require("../services");
const msgs_1 = require("../constants/msgs");
const user_types_1 = require("../types/user.types");
const getDoctors = async (_req, res, next) => {
    try {
        const [doctors, results] = await services_1.doctorService.findDoctors({
            user: {
                status: user_types_1.UserStatus.enable
            }
        }, {
            user: {
                firstName: true,
                lastName: true,
                email: true,
                telephone: true,
                status: true
            },
            medicalAppointmentDates: { id: true, date: true, status: true }
        }, { user: true, medicalAppointmentDates: true });
        return res.status(httpCodes_1.HTTPCODES.OK).json({
            status: msgs_1.MESSAGES.SUCCESS,
            results,
            doctors
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.DOCTORS_INTERNAL_NOT_FOUND, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.getDoctors = getDoctors;
