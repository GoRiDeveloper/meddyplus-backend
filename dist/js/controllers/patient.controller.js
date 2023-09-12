"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientInfo = exports.cancelPatientAppointment = exports.getPatient = exports.getPatients = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const msgs_1 = require("../constants/msgs");
const services_1 = require("../services");
const app_error_1 = require("../utils/app.error");
const getPatients = async (req, res, next) => {
    try {
        const { sessionUser } = req;
        const [patients, results] = await services_1.patientService.findPatients({
            medicalAppointments: {
                medicalAppointmentDate: {
                    doctor: {
                        user: {
                            id: sessionUser?.id
                        }
                    }
                }
            }
        }, {
            user: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                dateOfBirth: true,
                telephone: true,
                genre: true
            }
        }, {
            user: true
        });
        return res.status(httpCodes_1.HTTPCODES.OK).json({
            status: msgs_1.MESSAGES.SUCCESS,
            patients,
            results
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PATIENT_INFO_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.getPatients = getPatients;
const getPatient = async (req, res, next) => {
    try {
        // obtener el id del paciente
        const { sessionUser } = req;
        const patient = await services_1.patientService.findPatient({ user: { id: sessionUser?.id } }, false, {
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
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PATIENT_NOT_FOUND, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.getPatient = getPatient;
// Cancelar cita de parte del paciente
const cancelPatientAppointment = async (req, res, next) => {
    try {
        const { id } = req.safeData?.params;
        await services_1.patientService.cancelPatientAppointment(id);
        return res.status(httpCodes_1.HTTPCODES.NO_CONTENT).json({
            status: msgs_1.MESSAGES.SUCCESS
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_INVALID_TYPE, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
        }
    }
};
exports.cancelPatientAppointment = cancelPatientAppointment;
const patientInfo = async (req, res, next) => {
    try {
        const { id } = req.safeData?.params;
        const { patientInfo, medicalRecordInfo, patientMedicalHistories } = await services_1.patientService.getPatientInfo(id);
        return res.status(httpCodes_1.HTTPCODES.OK).json({
            status: msgs_1.MESSAGES.SUCCESS,
            patientInfo,
            medicalRecordInfo,
            patientMedicalHistories
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PATIENT_INFO_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.patientInfo = patientInfo;
