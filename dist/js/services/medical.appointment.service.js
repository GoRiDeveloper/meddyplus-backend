"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalAppointmentService = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const medical_appointment_dates_types_1 = require("../types/medical.appointment.dates.types");
const app_error_1 = require("../utils/app.error");
const entity_service_1 = require("./entity.service");
const entities_factory_1 = require("./factory/entities.factory");
class MedicalAppointmentService {
    entityService;
    constructor(medicalAppointmentRepository) {
        this.entityService = new entity_service_1.EntityService(medicalAppointmentRepository);
    }
    async createMedicalAppointment(sessionUser, medicalAppoinmentDateId, description) {
        //buscar la fecha de la cita y cambiar/actualizar su estado a selected
        const medicalAppointmentDate = await entities_factory_1.medicalAppointmentDatesService.findMedicalAppointmentDate({ id: medicalAppoinmentDateId }, false, { doctor: true }, true);
        medicalAppointmentDate.status = medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.selected;
        try {
            await entities_factory_1.medicalAppointmentDatesService.updateMedicalAppointmentDate(medicalAppointmentDate);
        }
        catch (err) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_FAIL_UPDATE, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
        //crear un objeto para la tabla de patients, y asignarle el sessionUser en la clave user de ese objeto
        const patientToCreate = {
            user: sessionUser
        };
        //crear el paciente en la tabla de patients
        let patient;
        try {
            const patientExists = await entities_factory_1.patientService.findPatient({ user: { id: sessionUser.id } }, false, { user: true, medicalAppointments: true }, false);
            if (patientExists) {
                patient = patientExists;
            }
            else {
                patient = await entities_factory_1.patientService.createPatient(patientToCreate);
            }
        }
        catch (err) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.CREATE_PATIENT_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
        //crear un objeto para la tabla de medicalAppointment, asignarle en la clave medicalAppointmentDate la fecha que buscamos y actualizamos su estado
        //en el objeto para la tabla medicalAppointment asignarle en la clave patient, el paciente que creamos
        const medicalAppoinment = {
            description,
            medicalAppointmentDate,
            patient
        };
        //devolver la cita creada
        return (await this.entityService.create(medicalAppoinment));
    }
}
exports.MedicalAppointmentService = MedicalAppointmentService;
