"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const medical_appointment_dates_types_1 = require("../types/medical.appointment.dates.types");
const app_error_1 = require("../utils/app.error");
const entity_factory_1 = require("./factory/entity.factory");
class PatientService {
    // private readonly patientRepository: PatientRepository
    entityFactory;
    constructor(paientRepository) {
        // this.patientRepository = paientRepository
        this.entityFactory = new entity_factory_1.EntityFactory(paientRepository);
    }
    async findPatient(filters, attributes, relationAttributes, error) {
        return (await this.entityFactory.findOne(filters, attributes, relationAttributes, error));
    }
    async findPatients(filters, attributes, relationAttributes) {
        return await this.entityFactory.findAll(filters, attributes, relationAttributes);
    }
    async createPatient(patient) {
        return (await this.entityFactory.create(patient, false));
    }
    // Cancelar la cita de parte del paciente
    async cancelPatientAppointment(appointmentId) {
        const filters = {
            id: appointmentId,
            status: (0, typeorm_1.In)([
                medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.pending,
                medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.selected
            ])
        };
        let medicalAppointmentDate;
        try {
            medicalAppointmentDate =
                await _1.medicalAppointmentDatesService.findMedicalAppointmentDate(filters, false, false, false);
        }
        catch (err) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATE_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
        if (!medicalAppointmentDate) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATE_NOT_EXISTS_OR_CANCELLED_OR_COMPLETED, httpCodes_1.HTTPCODES.NOT_FOUND);
        }
        medicalAppointmentDate.status = medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.cancelled;
        try {
            await _1.medicalAppointmentDatesService.updateMedicalAppointmentDate(medicalAppointmentDate);
        }
        catch (err) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_FAIL_UPDATE, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
    }
    async getPatientInfo(patientId) {
        let patientMedicalHistoryInfo;
        const medicalRecordInfo = await _1.medicalRecordService.findMedicalRecord({ patient: { id: patientId } }, false, false, false);
        if (medicalRecordInfo?.id) {
            patientMedicalHistoryInfo =
                await _1.patientMedicalHistoryService.findAllPatientMedicalHistory({ medicalRecord: { id: medicalRecordInfo?.id } }, false, false);
        }
        const patientInfo = await this.findPatient({ id: patientId }, {
            user: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                dateOfBirth: true,
                telephone: true,
                genre: true
            }
        }, { user: true }, false);
        return {
            patientInfo,
            medicalRecordInfo,
            patientMedicalHistories: {
                patientMedicalHistoryInfo: patientMedicalHistoryInfo
                    ? patientMedicalHistoryInfo[0]
                    : null,
                count: patientMedicalHistoryInfo ? patientMedicalHistoryInfo[1] : null
            }
        };
    }
}
exports.PatientService = PatientService;
