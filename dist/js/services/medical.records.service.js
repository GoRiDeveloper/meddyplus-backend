"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecordService = void 0;
const _1 = require(".");
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const app_error_1 = require("../utils/app.error");
const entity_factory_1 = require("./factory/entity.factory");
const typeorm_1 = require("typeorm");
const medical_appointment_dates_types_1 = require("../types/medical.appointment.dates.types");
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
    async createMedicalRecord(data, doctorId, patientId) {
        let patient;
        try {
            patient = (await _1.patientService.findPatient({
                id: patientId
            }, false, false, false));
            if (!patient)
                throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PATIENT_NOT_FOUND, httpCodes_1.HTTPCODES.NOT_FOUND);
        }
        catch (err) {
            if (err instanceof app_error_1.AppError) {
                throw err;
            }
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PATIENT_NOT_FOUND, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
        try {
            const verifyPatientAppointments = await _1.patientService.findPatient({
                medicalAppointments: {
                    medicalAppointmentDate: {
                        status: (0, typeorm_1.Not)(medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.selected),
                        doctor: { user: { id: doctorId } }
                    }
                }
            }, false, false, false);
            console.log({verifyPatientAppointments});
            if (verifyPatientAppointments)
                throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_RECORD_EXISTS, httpCodes_1.HTTPCODES.BAD_REQUEST);
        }
        catch (err) {
            console.log({err});
            if (err instanceof app_error_1.AppError) {
                throw err;
            }
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_RECORD_FAIL_FOUND, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
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
    async findMedicalRecord(filters, attributes, relationAttributes, error) {
        return (await this.entityFactory.findOne(filters, attributes, relationAttributes, error));
    }
    async updateMedicalRecord(medicalRecordId, data) {
        try {
            // busco el medicalRecord por findOne mediante el id del medicalRecordSchema
            const medicalRecord = await this.entityFactory.findOne({ id: medicalRecordId }, false, false, false);
            // si el medicalRecord tiene un valor falsy, envia al usuario "El registro médico aún no se ha creado"
            if (!medicalRecord) {
                throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_RECORD_NOT_FOUND, httpCodes_1.HTTPCODES.NOT_FOUND);
            }
        }
        catch (err) {
            if (err instanceof app_error_1.AppError) {
                throw err;
            }
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_RECORD_NOT_CREATED, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
        data.id = medicalRecordId;
        try {
            await this.entityFactory.updateOne(data);
        }
        catch (err) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_RECORD_NOT_UPDATED, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.MedicalRecordService = MedicalRecordService;
