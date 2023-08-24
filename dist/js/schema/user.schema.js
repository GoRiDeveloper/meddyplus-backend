"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordsSchema = exports.userSchema = void 0;
const validator_1 = __importDefault(require("validator"));
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
            .min(2, { message: msgs_1.MESSAGES.FIRST_NAME_MIN_LENGTH })
            .max(50, { message: msgs_1.MESSAGES.FIRST_NAME_MAX_LENGTH })
            .trim()
            .toLowerCase()
            .regex(/^[^0-9]*$/, { message: msgs_1.MESSAGES.FIRST_NAME_PURE_STRING }),
        lastName: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.LAST_NAME_REQUIRED_ERROR,
            invalid_type_error: msgs_1.MESSAGES.LAST_NAME_TYPE_ERROR
        })
            .min(2, { message: msgs_1.MESSAGES.LAST_NAME_MIN_LENGTH })
            .max(70, { message: msgs_1.MESSAGES.LAST_NAME_MAX_LENGTH })
            .trim()
            .toLowerCase()
            .regex(/^[^0-9]*$/, { message: msgs_1.MESSAGES.LAST_NAME_PURE_STRING }),
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
                    message: msgs_1.MESSAGES.EMAIL_ALREADY_REGISTERED
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
            .max(10, { message: msgs_1.MESSAGES.TELEPHONE_MAX_LENGTH })
            .superRefine((val, ctx) => {
            if (!validator_1.default.isNumeric(val)) {
                ctx.addIssue({
                    code: 'custom',
                    message: msgs_1.MESSAGES.TELEPHONE_ONLY_NUMBERS
                });
            }
        }),
        password: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.PASSWORD_REQUIRED_ERROR,
            invalid_type_error: msgs_1.MESSAGES.PASSWORD_TYPE_ERROR
        })
            .superRefine((password, ctx) => {
            if (!validator_1.default.isStrongPassword(password)) {
                ctx.addIssue({
                    code: 'custom',
                    message: msgs_1.MESSAGES.PASSWORD_TOO_WEAK
                });
            }
        }),
        dateOfBirth: zod_1.default.coerce.date()
    })
});
exports.passwordsSchema = zod_1.default.object({
    body: zod_1.default.object({
        currentPassword: zod_1.default.string({
            required_error: msgs_1.MESSAGES.PASSWORD_REQUIRED_ERROR,
            invalid_type_error: msgs_1.MESSAGES.PASSWORD_TYPE_ERROR
        }),
        newPassword: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.PASSWORD_REQUIRED_ERROR,
            invalid_type_error: msgs_1.MESSAGES.PASSWORD_TYPE_ERROR
        })
            .superRefine((password, ctx) => {
            if (!validator_1.default.isStrongPassword(password)) {
                ctx.addIssue({
                    code: 'custom',
                    message: msgs_1.MESSAGES.PASSWORD_TOO_WEAK
                });
            }
        })
    })
});
