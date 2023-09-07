"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDateByDoctor = exports.toggleStatusMedicalAppointmentDate = exports.createDates = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const msgs_1 = require("../constants/msgs");
const services_1 = require("../services");
const app_error_1 = require("../utils/app.error");
const createDates = async (req, res, next) => {
    try {
        const { sessionUser } = req;
        const { date, hours } = req.safeData?.body;
        const medicalAppointmentDates = await services_1.medicalAppointmentDatesService.createMedicalAppointmentDates(sessionUser, date, hours);
        return res.status(httpCodes_1.HTTPCODES.CREATED).json({
            status: msgs_1.MESSAGES.SUCCESS,
            message: msgs_1.MESSAGES.MEDICAL_APPOINTMENT_DATE_CREATED,
            medicalAppointmentDates
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATE_CREATE_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.createDates = createDates;
const toggleStatusMedicalAppointmentDate = async (req, res, next) => {
    try {
        const { id } = req.params;
        await services_1.medicalAppointmentDatesService.toggleStatusMedicalAppointmentDate(id);
        res.status(httpCodes_1.HTTPCODES.NO_CONTENT).json({
            status: msgs_1.MESSAGES.SUCCESS
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATE_CANCELLED_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.toggleStatusMedicalAppointmentDate = toggleStatusMedicalAppointmentDate;
const getAllDateByDoctor = async (req, res, next) => {
    try {
        const { id } = req.sessionUser;
        const [dates, count] = await services_1.medicalAppointmentDatesService.getAllMedicalAppoitmentDates(id);
        res.status(httpCodes_1.HTTPCODES.OK).json({
            status: msgs_1.MESSAGES.SUCCESS,
            dates,
            count
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.GET_ALL_DATES_BY_SINGLE_DOCTOR_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.getAllDateByDoctor = getAllDateByDoctor;
