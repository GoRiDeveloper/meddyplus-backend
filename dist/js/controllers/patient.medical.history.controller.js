"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatientMedicalHistory = exports.createPatientMedicalHistory = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const msgs_1 = require("../constants/msgs");
const services_1 = require("../services");
const app_error_1 = require("../utils/app.error");
const createPatientMedicalHistory = async (req, res, next) => {
    try {
        const { safeData } = req;
        const patientMedicalHistory = await services_1.patientMedicalHistoryService.createPatientMedicalHistory(safeData?.body, safeData?.params.id);
        return res.status(httpCodes_1.HTTPCODES.CREATED).json({
            status: msgs_1.MESSAGES.SUCCESS,
            patientMedicalHistory
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PATIENT_MEDICAL_HISTORY_SAVE_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.createPatientMedicalHistory = createPatientMedicalHistory;
const updatePatientMedicalHistory = async (req, res, next) => {
    try {
        const { safeData } = req;
        await services_1.patientMedicalHistoryService.updatePatientMedicalHistory(safeData?.params.id, safeData?.body);
        return res.status(httpCodes_1.HTTPCODES.NO_CONTENT).json({
            status: msgs_1.MESSAGES.SUCCESS
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PATIENT_MEDICAL_HISTORY_NOT_UPDATED, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.updatePatientMedicalHistory = updatePatientMedicalHistory;
