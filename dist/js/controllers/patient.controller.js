"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatient = void 0;
const httpCodes_1 = require("../constants/httpCodes");
const services_1 = require("../services");
const app_error_1 = require("../utils/app.error");
const msgs_1 = require("../constants/msgs");
const errorMsgs_1 = require("../constants/errorMsgs");
const getPatient = async (req, res, next) => {
    try {
        // obtener el id del paciente
        const { sessionUser } = req;
        const patient = await services_1.patientService.findPatient({ id: sessionUser?.id }, false, {
            medicalAppointments: {
                medicalAppointmentDate: {
                    doctor: { user: true }
                }
            }
        }, true);
        return res.status(httpCodes_1.HTTPCODES.OK).json({
            status: msgs_1.MESSAGES.SUCCESS,
            patient
        });
    }
    catch (err) {
        console.log(err);
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PATIENT_NOT_FOUND, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.getPatient = getPatient;
