"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalAppointmentService = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const medical_appointment_dates_types_1 = require("../types/medical.appointment.dates.types");
const app_error_1 = require("../utils/app.error");
const _1 = require("./");
const entity_factory_1 = require("./factory/entity.factory");
class MedicalAppointmentService {
    entityFactory;
    constructor(medicalAppointmentRepository) {
        this.entityFactory = new entity_factory_1.EntityFactory(medicalAppointmentRepository);
    }
    async createMedicalAppointment(sessionUser, medicalAppoinmentDateId, doctorId, description) {
        // buscar la fecha de la cita y cambiar/actualizar su estado a selected
        try {
            const medicalAppointmentsSelectedExists = await this.findMedicalAppointment({
            patient: { user: { id: sessionUser.id } },
            medicalAppointmentDate: {
                status: medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.selected,
                doctor: { id: doctorId }
            }
        }, false, false, false);
            if (medicalAppointmentsSelectedExists) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_SELECTED_EXISTS, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
        } catch (err) { throw err };
        
        const medicalAppointmentDate = await _1.medicalAppointmentDatesService.findMedicalAppointmentDate({
            id: medicalAppoinmentDateId,
            status: medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.pending
        }, false, { doctor: true }, false);
        if (!medicalAppointmentDate)
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATE_NOT_EXISTS_OR_CANCELLED_OR_COMPLETED, httpCodes_1.HTTPCODES.NOT_FOUND);
        medicalAppointmentDate.status = medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.selected;
        try {
            await _1.medicalAppointmentDatesService.updateMedicalAppointmentDate(medicalAppointmentDate);
        }
        catch (err) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_FAIL_UPDATE, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
        // crear un objeto para la tabla de patients, y asignarle el sessionUser en la clave user de ese objeto
        const patientToCreate = {
            user: sessionUser
        };
        // crear el paciente en la tabla de patients
        let patient;
        try {
            const patientExists = await _1.patientService.findPatient({ user: { id: sessionUser.id } }, false, { user: true, medicalAppointments: true }, false);
            if (patientExists) {
                patient = patientExists;
            }
            else {
                patient = await _1.patientService.createPatient(patientToCreate);
            }
        }
        catch (err) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.CREATE_PATIENT_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
        // crear un objeto para la tabla de medicalAppointment, asignarle en la clave medicalAppointmentDate la fecha que buscamos y actualizamos su estado
        // en el objeto para la tabla medicalAppointment asignarle en la clave patient, el paciente que creamos
        const medicalAppoinmentToCreate = {
            description,
            medicalAppointmentDate,
            patient
        };
        // devolver la cita creada
        return {
            medicalAppointment: (await this.entityFactory.create(medicalAppoinmentToCreate, false)),
            patientId: patient.id
        };
    }
    async findMedicalAppointment(filters, attributes, relationAttributes, error) {
        return (await this.entityFactory.findOne(filters, attributes, relationAttributes, error));
    }
    async findMedicalAppointments(filters, attributes, relationAttributes) {
        return await this.entityFactory.findAll(filters, attributes, relationAttributes);
    }
}
exports.MedicalAppointmentService = MedicalAppointmentService;
