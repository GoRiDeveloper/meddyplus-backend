"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRouter = void 0;
const express_1 = require("express");
const doctor_controller_1 = require("../controllers/doctor.controller");
const medical_appointment_controller_1 = require("../controllers/medical.appointment.controller");
const patient_controller_1 = require("../controllers/patient.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const schema_middleware_1 = require("../middlewares/schema.middleware");
const id_schema_1 = require("../schema/id.schema");
const medical_appointment_schema_1 = require("../schema/medical.appointment.schema");
const user_types_1 = require("../types/user.types");
exports.patientRouter = (0, express_1.Router)();
exports.patientRouter.use(auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)(user_types_1.UserRole.patient));
exports.patientRouter.get('/doctors', doctor_controller_1.getDoctors);
exports.patientRouter.get('/medical-appointment', patient_controller_1.getPatient);
exports.patientRouter.get('/get-patient-info/:id', // este id es el id del paciente
(0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), patient_controller_1.patientInfo);
exports.patientRouter.post('/medical-appointment/:id/:doctorId', (0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), (0, schema_middleware_1.schemaValidator)(medical_appointment_schema_1.doctorIdSchema), (0, schema_middleware_1.schemaValidator)(medical_appointment_schema_1.medicalAppointmentSchema), medical_appointment_controller_1.createMedicalAppointment);
// cancelar cita de parte del paciente
exports.patientRouter.delete('/cancel-appointment/:id', (0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), patient_controller_1.cancelPatientAppointment);
