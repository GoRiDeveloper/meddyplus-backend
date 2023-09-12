"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientMedicalHistorySchema = void 0;
const zod_1 = __importDefault(require("zod"));
const msgs_1 = require("../constants/msgs");
exports.patientMedicalHistorySchema = zod_1.default.object({
    body: zod_1.default.object({
        notes: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.NOTES_REQUIRED,
            invalid_type_error: msgs_1.MESSAGES.NOTES_WRONG_TYPE
        })
            .min(8, { message: msgs_1.MESSAGES.NOTES_MIN_LENGTH })
            .max(255, { message: msgs_1.MESSAGES.NOTES_MAX_LENGTH }),
        symptoms: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.SYMPTOMS_REQUIRED,
            invalid_type_error: msgs_1.MESSAGES.SYMPTOMS_WRONG_TYPE
        })
            .min(8, { message: msgs_1.MESSAGES.SYMPTOMS_MIN_LENGTH })
            .max(255, { message: msgs_1.MESSAGES.SYMPTOMS_MAX_LENGTH }),
        treatments: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.TREATMENTS_REQUIRED,
            invalid_type_error: msgs_1.MESSAGES.TREATMENTS_WRONG_TYPE
        })
            .min(8, { message: msgs_1.MESSAGES.TREATMENTS_MIN_LENGTH })
            .max(255, { message: msgs_1.MESSAGES.TREATMENTS_MAX_LENGTH }),
        medication: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.MEDICATION_REQUIRED,
            invalid_type_error: msgs_1.MESSAGES.MEDICATION_WRONG_TYPE
        })
            .min(8, { message: msgs_1.MESSAGES.MEDICATION_MIN_LENGTH })
            .max(255, { message: msgs_1.MESSAGES.MEDICATION_MAX_LENGTH }),
        height: zod_1.default
            .number({
            required_error: msgs_1.MESSAGES.HEIGTH_REQUIRED,
            invalid_type_error: msgs_1.MESSAGES.HEIGTH_WRONG_TYPE
        })
            .superRefine((val, ctx) => {
            if (val.toString().length < 2 || val.toString().length > 3) {
                ctx.addIssue({
                    code: zod_1.default.ZodIssueCode.custom,
                    message: msgs_1.MESSAGES.HEIGTH_INVALID_LENGTH
                });
            }
        }),
        bloodPressure: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.BLOOD_PRESSURE_REQUIRED,
            invalid_type_error: msgs_1.MESSAGES.BLOOD_PRESSURE_WRONG_TYPE
        })
            .regex(/^\d{2,3}\/\d{2,3}$/, {
            message: msgs_1.MESSAGES.BLOOD_PRESSURE_REGEX_WRONG_TYPE
        }),
        weight: zod_1.default
            .number({
            required_error: msgs_1.MESSAGES.WEIGHT_REQUIRED,
            invalid_type_error: msgs_1.MESSAGES.WEIGHT_WRONG_TYPE
        })
            .superRefine((val, ctx) => {
            if (val.toString().length < 2 || val.toString().length > 3) {
                ctx.addIssue({
                    code: zod_1.default.ZodIssueCode.custom,
                    message: msgs_1.MESSAGES.WEIGHT_INVALID_LENGTH
                });
            }
        })
    })
});
// height >= 2 || height <= 3
