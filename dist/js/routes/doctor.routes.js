"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRouter = void 0;
const express_1 = require("express");
const medical_appointment_dates_controller_1 = require("../controllers/medical.appointment.dates.controller");
const medical_records_controller_1 = require("../controllers/medical.records.controller");
const patient_controller_1 = require("../controllers/patient.controller");
const patient_medical_history_controller_1 = require("../controllers/patient.medical.history.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const schema_middleware_1 = require("../middlewares/schema.middleware");
const id_schema_1 = require("../schema/id.schema");
const medical_appointment_schema_1 = require("../schema/medical.appointment.schema");
const medical_appointments_dates_schema_1 = require("../schema/medical.appointments.dates.schema");
const medical_record_schema_1 = require("../schema/medical.record.schema");
const patient_medical_history_schema_1 = require("../schema/patient.medical.history.schema");
const user_types_1 = require("../types/user.types");
exports.doctorRouter = (0, express_1.Router)();
exports.doctorRouter.use(auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)(user_types_1.UserRole.doctor));
exports.doctorRouter.get('/get-doctor-patients', patient_controller_1.getPatients);
exports.doctorRouter.get('/get-all-dates-by-doctor', medical_appointment_dates_controller_1.getAllDatesByDoctor);
exports.doctorRouter.get('/get-patient-info/:id', // este id es el id del paciente
(0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), patient_controller_1.patientInfo);
exports.doctorRouter.get('/medical-appointments-info/:doctorId/:patientId', (0, schema_middleware_1.schemaValidator)(medical_appointment_schema_1.medicalAppointmentsIdsSchema), patient_controller_1.getMedicalAppointmentsInfo);
exports.doctorRouter.post('/assign-available-dates', (0, schema_middleware_1.schemaValidator)(medical_appointments_dates_schema_1.medicalAppointmentsDatesSchema), medical_appointment_dates_controller_1.createDates);
exports.doctorRouter.post('/create-medical-record/:id', // este id es el id del paciente
(0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), (0, schema_middleware_1.schemaValidator)(medical_record_schema_1.medicalRecordSchema), medical_records_controller_1.createMedicalRecord);
exports.doctorRouter.post('/create-patient-medical-history/:id', // este id es el id del medical record
(0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), (0, schema_middleware_1.schemaValidator)(patient_medical_history_schema_1.patientMedicalHistorySchema), patient_medical_history_controller_1.createPatientMedicalHistory);
exports.doctorRouter.post('/get-all-hours-from-date-doctor', medical_appointment_dates_controller_1.getAllHoursByDoctorDate);
exports.doctorRouter.patch('/toggle-medical-appointment-date-status/:id', (0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), medical_appointment_dates_controller_1.toggleStatusMedicalAppointmentDate);
exports.doctorRouter.patch('/update-medical-record/:id', (0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), (0, schema_middleware_1.schemaValidator)(medical_record_schema_1.medicalRecordSchema.deepPartial()), medical_records_controller_1.updateMedicalRecord);
exports.doctorRouter.patch('/update-patient-medical-history/:id', // este id es del patient medical history
(0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), (0, schema_middleware_1.schemaValidator)(patient_medical_history_schema_1.patientMedicalHistorySchema.deepPartial()), patient_medical_history_controller_1.updatePatientMedicalHistory);
exports.doctorRouter.patch('/completed-appointment/:id', // id de la fecha de la cita médica
(0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), medical_appointment_dates_controller_1.updateToCompletedDate);
