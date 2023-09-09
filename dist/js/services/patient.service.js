"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const typeorm_1 = require("typeorm");
const entity_factory_1 = require("./factory/entity.factory");
const app_error_1 = require("../utils/app.error");
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const medical_appointment_dates_types_1 = require("../types/medical.appointment.dates.types");
const _1 = require(".");
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
}
exports.PatientService = PatientService;
