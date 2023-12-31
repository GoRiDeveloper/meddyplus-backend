"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateToCompletedDate = exports.getAllHoursByDoctorDate = exports.getAllDatesByDoctor = exports.toggleStatusMedicalAppointmentDate = exports.createDates = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const msgs_1 = require("../constants/msgs");
const services_1 = require("../services");
const app_error_1 = require("../utils/app.error");
const createDates = async (req, res, next) => {
    try {
        const { sessionUser } = req;
        const { date, hours } = req.safeData?.body;
        const { medicalAppointmentDates, doctorId } = await services_1.medicalAppointmentDatesService.createMedicalAppointmentDates(sessionUser, date, hours);
        return res.status(httpCodes_1.HTTPCODES.CREATED).json({
            status: msgs_1.MESSAGES.SUCCESS,
            message: msgs_1.MESSAGES.MEDICAL_APPOINTMENT_DATE_CREATED,
            medicalAppointmentDates,
            doctorId
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
        await services_1.medicalAppointmentDatesService.toggleStatusMedicalAppointmentDate(id, req?.sessionUser);
        return res.status(httpCodes_1.HTTPCODES.NO_CONTENT).json({
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
const getAllDatesByDoctor = async (req, res, next) => {
    try {
        const { id } = req.sessionUser;
        const [dates, count] = await services_1.medicalAppointmentDatesService.getAllMedicalAppoitmentDates(id);
        return res.status(httpCodes_1.HTTPCODES.OK).json({
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
exports.getAllDatesByDoctor = getAllDatesByDoctor;
const getAllHoursByDoctorDate = async (req, res, next) => {
    try {
        const { id } = req.sessionUser;
        const { date } = req.body;
        const response = await services_1.medicalAppointmentDatesService.getAllMedicalAppoitmentDatesPendingAndSelected(id);
        const dates = response[0];
        if (Array.isArray(dates)) {
            const matchingHours = dates.filter((item) => {
                const itemDate = item.date.split(' ')[0];
                return itemDate === date;
            });
            const hours = matchingHours.map((item) => {
                const parts = item.date.split(' ');
                const hour = parts[1];
                const obj = {
                    hour,
                    status: item.status ?? ''
                };
                return obj;
            });
            return res.status(httpCodes_1.HTTPCODES.OK).json({
                status: msgs_1.MESSAGES.SUCCESS,
                hours
            });
        }
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.GET_HOURS_FROM_SPECIFIC_DOCTOR_DATE_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.getAllHoursByDoctorDate = getAllHoursByDoctorDate;
const updateToCompletedDate = async (req, res, next) => {
    try {
        const { id } = req.safeData?.params;
        await services_1.medicalAppointmentDatesService.completedAppointmentDate(id);
        return res.status(httpCodes_1.HTTPCODES.NO_CONTENT).json({
            status: msgs_1.MESSAGES.SUCCESS
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATE_UPDATE_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.updateToCompletedDate = updateToCompletedDate;
