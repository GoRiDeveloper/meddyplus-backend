"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMedicalRecord = exports.updateMedicalRecord = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const msgs_1 = require("../constants/msgs");
const services_1 = require("../services");
const app_error_1 = require("../utils/app.error");
const updateMedicalRecord = async (req, res, next) => {
    try {
        const { safeData } = req;
        await services_1.medicalRecordService.updateMedicalRecord(safeData?.params.id, safeData?.body);
        return res.status(httpCodes_1.HTTPCODES.NO_CONTENT).json({
            status: msgs_1.MESSAGES.SUCCESS
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_RECORD_NOT_UPDATED, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.updateMedicalRecord = updateMedicalRecord;
const createMedicalRecord = async (req, res, next) => {
    try {
        const { safeData, sessionUser } = req;
        const medicalRecord = await services_1.medicalRecordService.createMedicalRecord(safeData?.body, sessionUser?.id, safeData?.params.id);
        return res.status(httpCodes_1.HTTPCODES.CREATED).json({
            status: msgs_1.MESSAGES.SUCCESS,
            medicalRecord
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_RECORD_FAIL_SAVE, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.createMedicalRecord = createMedicalRecord;
