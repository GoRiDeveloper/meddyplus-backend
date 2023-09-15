"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMedicalAppointment = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const msgs_1 = require("../constants/msgs");
const services_1 = require("../services");
const app_error_1 = require("../utils/app.error");
const createMedicalAppointment = async (req, res, next) => {
    try {
        const { sessionUser, safeData } = req;
        const { medicalAppointment, patientId } = await services_1.medicalAppointmentService.createMedicalAppointment(sessionUser, safeData?.params.id, safeData?.params.doctorId, safeData?.body.description);
        return res.status(httpCodes_1.HTTPCODES.CREATED).json({
            status: msgs_1.MESSAGES.SUCCESS,
            medicalAppointment,
            patientId
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_FAIL_SAVE, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.createMedicalAppointment = createMedicalAppointment;
