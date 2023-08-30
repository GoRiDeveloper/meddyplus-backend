"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRouter = void 0;
const express_1 = require("express");
const schema_middleware_1 = require("../middlewares/schema.middleware");
const medical_appointments_dates_schema_1 = require("../schema/medical.appointments.dates.schema");
// import { protect, restrictTo } from '../middlewares/auth.middleware'
// import { UserRole } from '../types/user.types'
exports.doctorRouter = (0, express_1.Router)();
// adminRouter.use(protect, restrictTo(UserRole.doctor))
exports.doctorRouter.post('/assign-available-dates', (0, schema_middleware_1.schemaValidator)(medical_appointments_dates_schema_1.medicalAppointmentsDatesSchema));
