"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const validator_1 = __importDefault(require("validator"));
const zod_1 = __importDefault(require("zod"));
const msgs_1 = require("../constants/msgs");
const services_1 = require("../services");
const user_types_1 = require("../types/user.types");
exports.loginSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.EMAIL_REQUIRED_ERROR,
            invalid_type_error: msgs_1.MESSAGES.EMAIL_TYPE_ERROR
        })
            .email({ message: msgs_1.MESSAGES.EMAIL_INVALID })
            .trim()
            .toLowerCase()
            .superRefine(async (email, ctx) => {
            const filters = { email, status: user_types_1.UserStatus.enable };
            const userExists = await services_1.userService.findUser(filters, false, false, false);
            if (!userExists) {
                ctx.addIssue({
                    code: zod_1.default.ZodIssueCode.custom,
                    message: msgs_1.MESSAGES.EMAIL_NOT_REGISTERED
                });
            }
        }),
        password: zod_1.default
            .string({
            required_error: msgs_1.MESSAGES.PASSWORD_REQUIRED_ERROR,
            invalid_type_error: msgs_1.MESSAGES.PASSWORD_TYPE_ERROR
        })
            .superRefine((val, ctx) => {
            if (!validator_1.default.isStrongPassword(val)) {
                ctx.addIssue({
                    code: zod_1.default.ZodIssueCode.custom,
                    message: msgs_1.MESSAGES.PASSWORD_TOO_WEAK
                });
            }
        })
    })
});
