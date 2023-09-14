"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientMedicalHistoryService = exports.medicalRecordService = exports.patientService = exports.medicalAppointmentService = exports.doctorService = exports.medicalAppointmentDatesService = exports.userService = void 0;
/**
 * Este archivo es responsable de configurar y proporcionar servicios relacionados con las entidades médicas
 * y repositorios necesarios para acceder a la base de datos.
 */
const entities_1 = require("../entities");
const database_config_1 = require("./database/database.config");
const doctor_service_1 = require("./doctor.service");
const medical_appointment_dates_service_1 = require("./medical.appointment.dates.service");
const medical_appointment_service_1 = require("./medical.appointment.service");
const medical_records_service_1 = require("./medical.records.service");
const patient_medical_history_service_1 = require("./patient.medical.history.service");
const patient_service_1 = require("./patient.service");
const user_service_1 = require("./user.service");
// Obtención de repositorios de la base de datos
const userRepository = database_config_1.AppDataSrc.getRepository(entities_1.User);
const patientRepository = database_config_1.AppDataSrc.getRepository(entities_1.Patient);
const doctorRepository = database_config_1.AppDataSrc.getRepository(entities_1.Doctor);
const medicalAppointmentDatesRespository = database_config_1.AppDataSrc.getRepository(entities_1.MedicalAppointmentDates);
const medicalAppointmentRepository = database_config_1.AppDataSrc.getRepository(entities_1.MedicalAppointment);
const medicalRecordRepository = database_config_1.AppDataSrc.getRepository(entities_1.MedicalRecord);
const patientMedicalHistoryRepository = database_config_1.AppDataSrc.getRepository(entities_1.PatientMedicalHistory);
(() => {
    exports.userService = new user_service_1.UserService(userRepository);
    exports.medicalAppointmentDatesService = new medical_appointment_dates_service_1.MedicalAppointmentDatesService(medicalAppointmentDatesRespository);
    exports.doctorService = new doctor_service_1.DoctorService(doctorRepository);
    exports.medicalAppointmentService = new medical_appointment_service_1.MedicalAppointmentService(medicalAppointmentRepository);
    exports.patientService = new patient_service_1.PatientService(patientRepository);
    exports.medicalRecordService = new medical_records_service_1.MedicalRecordService(medicalRecordRepository);
    exports.patientMedicalHistoryService = new patient_medical_history_service_1.PatientMedicalHistoryService(patientMedicalHistoryRepository);
})();
