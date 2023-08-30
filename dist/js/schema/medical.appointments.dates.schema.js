"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalAppointmentsDatesSchema = void 0;
const validator_1 = __importDefault(require("validator"));
const zod_1 = __importDefault(require("zod"));
exports.medicalAppointmentsDatesSchema = zod_1.default.object({
    body: zod_1.default.object({
        date: zod_1.default
            .string({
            required_error: 'La fecha con su hora es requerida',
            invalid_type_error: 'La fecha con su hora debe venir en un arreglo de strings'
        })
            .superRefine((inputDate, ctx) => {
            if (!validator_1.default.isDate(inputDate)) {
                ctx.addIssue({
                    code: zod_1.default.ZodIssueCode.custom,
                    message: 'La fecha tiene un formato incorrecto'
                });
            }
        }),
        hours: zod_1.default.array(zod_1.default.string()).superRefine((hours, ctx) => {
            hours.forEach((hour) => {
                if (!validator_1.default.isTime(hour)) {
                    ctx.addIssue({
                        code: zod_1.default.ZodIssueCode.custom,
                        message: 'La hora tiene un formato incorrecto'
                    });
                }
            });
        })
    })
});
