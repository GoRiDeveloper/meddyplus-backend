"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalRecordSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const msgs_1 = require("../constants/msgs");
exports.medicalRecordSchema = zod_1.default.object({
    body: zod_1.default.object({
        allergies: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.ALLERGIES_REQUIRED,
            invalid_type_error: msgs_1.MESSAGES.ALLERGIES_WRONG_TYPE
        })
            .min(8, { message: msgs_1.MESSAGES.ALLERGIES_MIN_LENGTH })
            .max(255, { message: msgs_1.MESSAGES.ALLERGIES_MAX_LENGTH }),
        previousMedicalConditions: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.PREVIOUS_MEDICAL_CONDITIONS_REQUIRED,
            invalid_type_error: msgs_1.MESSAGES.PREVIOUS_MEDICAL_CONDITIONS_WRONG_TYPE
        })
            .min(8, { message: msgs_1.MESSAGES.PREVIOUS_MEDICAL_CONDITIONS_MIN_LENGTH }),
        familyMedicalHistory: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.FAMILY_MEDICAL_HISTORY_REQUIRED,
            invalid_type_error: msgs_1.MESSAGES.FAMILY_MEDICAL_HISTORY_WRONG_TYPE
        })
            .min(8, { message: msgs_1.MESSAGES.FAMILY_MEDICAL_HISTORY_MIN_LENGTH })
    })
});
