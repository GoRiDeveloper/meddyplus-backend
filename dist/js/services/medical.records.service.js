"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecordService = void 0;
const _1 = require(".");
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const app_error_1 = require("../utils/app.error");
const entity_factory_1 = require("./factory/entity.factory");
class MedicalRecordService {
    entityFactory;
    constructor(medicalRecordRepository) {
        this.entityFactory = new entity_factory_1.EntityFactory(medicalRecordRepository);
    }
    // servicio de prueba para verificar relaciones correctamente
    // async getMedicalRecord(medicalRecordId: number): Promise<any> {
    //   debugger
    //   const relationAttrs = {
    //     patient: {
    //       medicalAppointments: { medicalAppointmentDate: { doctor: true } }
    //     }
    //   }
    //   const medicalRecord = await this.entityFactory.findOne(
    //     { id: medicalRecordId },
    //     false,
    //     relationAttrs,
    //     false
    //   )
    //   return medicalRecord
    // }
    async createMedicalRecord(data, patientId) {
        const patient = await _1.patientService.findPatient({ id: patientId }, false, false, false);
        const medicalRecordToCreate = {
            ...data,
            date: new Date().toLocaleDateString(),
            patient
        };
        try {
            return await this.entityFactory.create(medicalRecordToCreate, false);
        }
        catch (err) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_RECORD_FAIL_SAVE, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.MedicalRecordService = MedicalRecordService;
