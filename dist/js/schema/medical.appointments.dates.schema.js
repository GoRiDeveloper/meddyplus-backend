"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalAppointmentsDatesSchema = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const validator_1 = __importDefault(require("validator"));
const zod_1 = __importDefault(require("zod"));
const errorMsgs_1 = require("../constants/errorMsgs");
const verify_duplicates_1 = require("../utils/verify.duplicates");
exports.medicalAppointmentsDatesSchema = zod_1.default.object({
    body: zod_1.default.object({
        date: zod_1.default
            .string({
            required_error: errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_REQUIRED,
            invalid_type_error: errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_INVALID_TYPE
        })
            .superRefine((inputDate, ctx) => {
            const isValidDate = (0, dayjs_1.default)(inputDate).isValid();
            if (!isValidDate) {
                ctx.addIssue({
                    code: zod_1.default.ZodIssueCode.custom,
                    message: errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_DATE_INVALID_FORMAT
                });
            }
        }),
        hours: zod_1.default
            .array(zod_1.default.string({
            invalid_type_error: errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_HOURS_INVALID_FORMAT_STRING
        }))
            .superRefine((hours, ctx) => {
            if (hours.length < 1)
                ctx.addIssue({
                    code: zod_1.default.ZodIssueCode.custom,
                    message: errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_HOURS_EMPTY_ARRAY
                });
            if ((0, verify_duplicates_1.verifyArrayDuplicates)(hours))
                ctx.addIssue({
                    code: zod_1.default.ZodIssueCode.custom,
                    message: errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_HOURS_REPEATED
                });
            hours.forEach((hour) => {
                if (!hour || !validator_1.default.isTime(hour)) {
                    ctx.addIssue({
                        code: zod_1.default.ZodIssueCode.custom,
                        message: errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_HOURS_INVALID_FORMAT
                    });
                }
            });
        })
    })
});
