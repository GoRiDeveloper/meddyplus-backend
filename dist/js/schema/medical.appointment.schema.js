"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalAppointmentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const msgs_1 = require("../constants/msgs");
exports.medicalAppointmentSchema = zod_1.default.object({
    body: zod_1.default.object({
        description: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.MEDICAL_APPOINTMENT_DESC_REQUIRED,
            invalid_type_error: msgs_1.MESSAGES.MEDICAL_APPOINTMENT_DESC_TYPE
        })
            .trim()
            .toLowerCase()
            .min(20, { message: msgs_1.MESSAGES.MEDICAL_APPOINTMENT_DESC_MIN_LENGTH })
    })
});
