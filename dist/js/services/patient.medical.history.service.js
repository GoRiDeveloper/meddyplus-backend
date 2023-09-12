"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientMedicalHistoryService = void 0;
const _1 = require(".");
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const app_error_1 = require("../utils/app.error");
const entity_factory_1 = require("./factory/entity.factory");
class PatientMedicalHistoryService {
    entityFactory;
    constructor(patientMedicalHistoryRepository) {
        this.entityFactory = new entity_factory_1.EntityFactory(patientMedicalHistoryRepository);
    }
    async createPatientMedicalHistory(data, medicalRecordId) {
        // Buscamos el medical record del paciente para verificar que exista
        const medicalRecord = await _1.medicalRecordService.findMedicalRecord({ id: medicalRecordId }, false, false, false);
        if (!medicalRecord) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_RECORD_NOT_FOUND, httpCodes_1.HTTPCODES.NOT_FOUND);
        }
        const patientMedicalHistoryToCreate = {
            ...data,
            date: new Date().toLocaleDateString(),
            medicalRecord: medicalRecord.id
        };
        try {
            return await this.entityFactory.create(patientMedicalHistoryToCreate, false);
        }
        catch (err) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PATIENT_MEDICAL_HISTORY_SAVE_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
    }
    async findAllPatientMedicalHistory(filters, attributes, relationAttributes) {
        return await this.entityFactory.findAll(filters, attributes, relationAttributes);
    }
}
exports.PatientMedicalHistoryService = PatientMedicalHistoryService;
