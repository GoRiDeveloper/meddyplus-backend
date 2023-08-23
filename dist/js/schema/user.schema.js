"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const msgs_1 = require("../constants/msgs");
const entities_factory_1 = require("../services/factory/entities.factory");
const user_types_1 = require("../types/user.types");
exports.userSchema = zod_1.default.object({
    body: zod_1.default.object({
        firstName: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.FIRST_NAME_REQUIRED_ERROR,
            invalid_type_error: msgs_1.MESSAGES.FIRST_NAME_TYPE_ERROR
        })
            .min(2, { message: 'El nombre debe ser de mínimo 2 caracteres.' })
            .max(50, { message: 'El nombre excede la longitud máxima.' })
            .trim()
            .toLowerCase(),
        lastName: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.LAST_NAME_REQUIRED_ERROR,
            invalid_type_error: msgs_1.MESSAGES.LAST_NAME_TYPE_ERROR
        })
            .min(3, { message: 'El apellido debe ser de mínimo 2 caracteres.' })
            .max(70, { message: 'El apellido excede la longitud máxima.' })
            .trim()
            .toLowerCase(),
        email: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.EMAIL_REQUIRED_ERROR,
            invalid_type_error: msgs_1.MESSAGES.EMAIL_TYPE_ERROR
        })
            .email({ message: msgs_1.MESSAGES.EMAIL_INVALID })
            .trim()
            .toLowerCase()
            .superRefine(async (email, ctx) => {
            const filters = {
                email
            };
            const userExists = await entities_factory_1.userService.findUser(filters, false, false, false);
            if (userExists)
                ctx.addIssue({
                    code: zod_1.default.ZodIssueCode.custom,
                    message: 'El email ya esta registrado.'
                });
        }),
        genre: zod_1.default.enum([user_types_1.UserGenre.female, user_types_1.UserGenre.male], {
            required_error: msgs_1.MESSAGES.GENRE_REQUIRED_ERROR,
            invalid_type_error: msgs_1.MESSAGES.GENRE_TYPE_ERROR
        }),
        role: zod_1.default.optional(zod_1.default.enum([user_types_1.UserRole.admin, user_types_1.UserRole.patient, user_types_1.UserRole.doctor], {
            required_error: msgs_1.MESSAGES.ROLE_REQUIRED_ERROR,
            invalid_type_error: msgs_1.MESSAGES.ROLE_TYPE_ERROR
        })),
        telephone: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.TELEPHONE_REQUIRED_ERROR,
            invalid_type_error: msgs_1.MESSAGES.TELEPHONE_TYPE_ERROR
        })
            .min(10, { message: msgs_1.MESSAGES.TELEPHONE_MIN_LENGTH })
            .max(10, { message: msgs_1.MESSAGES.TELEPHONE_MAX_LENGTH }),
        password: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.PASSWORD_REQUIRED_ERROR,
            invalid_type_error: msgs_1.MESSAGES.PASSWORD_TYPE_ERROR
        })
            .min(5, { message: 'La contraseña debe ser de mínimo 5 caracteres' }),
        dateOfBirth: zod_1.default.coerce.date()
    })
});
