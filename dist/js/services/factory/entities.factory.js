"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalAppointmentDatesService = exports.userService = void 0;
const entities_1 = require("../../entities");
const database_config_1 = require("../database/database.config");
const user_service_1 = require("../user.service");
const medical_appointment_dates_service_1 = require("../medical.appointment.dates.service");
const userRepository = database_config_1.AppDataSrc.getRepository(entities_1.User);
// const patientRepository: Repository<Patient> = AppDataSrc.getRepository(Patient)
// const doctorRepository: Repository<Doctor> = AppDataSrc.getRepository(Doctor)
const medicalAppointmentDatesRespository = database_config_1.AppDataSrc.getRepository(entities_1.MedicalAppointmentDates);
(() => {
    exports.userService = new user_service_1.UserService(userRepository);
    exports.medicalAppointmentDatesService = new medical_appointment_dates_service_1.MedicalAppointmentDatesService(medicalAppointmentDatesRespository);
})();
