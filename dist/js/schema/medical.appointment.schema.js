"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalAppointmentsIdsSchema = exports.medicalAppointmentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const msgs_1 = require("../constants/msgs");
const errorMsgs_1 = require("../constants/errorMsgs");
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
exports.medicalAppointmentsIdsSchema = zod_1.default.object({
    params: zod_1.default.object({
        doctorId: zod_1.default.string().transform((doctorId, ctx) => {
            const parsed = parseInt(doctorId);
            if (isNaN(parsed))
                ctx.addIssue({
                    code: zod_1.default.ZodIssueCode.custom,
                    message: errorMsgs_1.ERROR_MSGS.ID_TYPE_MISMATCH
                });
            return parsed;
        }),
        patientId: zod_1.default.string().transform((patientId, ctx) => {
            const parsed = parseInt(patientId);
            if (isNaN(parsed))
                ctx.addIssue({
                    code: zod_1.default.ZodIssueCode.custom,
                    message: errorMsgs_1.ERROR_MSGS.ID_TYPE_MISMATCH
                });
            return parsed;
        })
    })
});
