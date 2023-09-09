"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRouter = void 0;
const express_1 = require("express");
const medical_appointment_dates_controller_1 = require("../controllers/medical.appointment.dates.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const schema_middleware_1 = require("../middlewares/schema.middleware");
const id_schema_1 = require("../schema/id.schema");
const medical_appointments_dates_schema_1 = require("../schema/medical.appointments.dates.schema");
const user_types_1 = require("../types/user.types");
const medical_records_controller_1 = require("../controllers/medical.records.controller");
const medical_record_schema_1 = require("../schema/medical.record.schema");
exports.doctorRouter = (0, express_1.Router)();
exports.doctorRouter.use(auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)(user_types_1.UserRole.doctor));
// ruta de prueba para verificar relaciones correctamente
//doctorRouter.get('/:id', schemaValidator(idSchema), getMedicalRecord)
exports.doctorRouter.post('/assign-available-dates', (0, schema_middleware_1.schemaValidator)(medical_appointments_dates_schema_1.medicalAppointmentsDatesSchema), medical_appointment_dates_controller_1.createDates);
exports.doctorRouter.post('/create-medical-record/:id', (0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), (0, schema_middleware_1.schemaValidator)(medical_record_schema_1.medicalRecordSchema), medical_records_controller_1.createMedicalRecord);
exports.doctorRouter.patch('/toggle-medical-appointment-date-status/:id', (0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), medical_appointment_dates_controller_1.toggleStatusMedicalAppointmentDate);
exports.doctorRouter.get('/get-all-dates-by-doctor', medical_appointment_dates_controller_1.getAllDatesByDoctor);
exports.doctorRouter.post('/get-all-hours-from-date-doctor', medical_appointment_dates_controller_1.getAllHoursByDoctorDate);
