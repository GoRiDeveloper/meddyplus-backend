"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRouter = void 0;
const express_1 = require("express");
const schema_middleware_1 = require("../middlewares/schema.middleware");
const id_schema_1 = require("../schema/id.schema");
const medical_appointment_controller_1 = require("../controllers/medical.appointment.controller");
const medical_appointment_schema_1 = require("../schema/medical.appointment.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_types_1 = require("../types/user.types");
exports.patientRouter = (0, express_1.Router)();
exports.patientRouter.use(auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)(user_types_1.UserRole.patient));
exports.patientRouter.post('/medical-appointment/:id', (0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), (0, schema_middleware_1.schemaValidator)(medical_appointment_schema_1.medicalAppointmentSchema), medical_appointment_controller_1.createMedicalAppointment);
// patientRouter.get('/medicalappoinment', medicaldateappointment)
