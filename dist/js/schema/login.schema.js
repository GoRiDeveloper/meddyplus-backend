"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const validator_1 = __importDefault(require("validator"));
const zod_1 = __importDefault(require("zod"));
const msgs_1 = require("../constants/msgs");
const entities_factory_1 = require("../services/factory/entities.factory");
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
            const filters = { email };
            const userExists = await entities_factory_1.userService.findUser(filters, false, false, false);
            if (!userExists) {
                ctx.addIssue({
                    code: 'custom',
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
                    code: 'custom',
                    message: msgs_1.MESSAGES.PASSWORD_TOO_WEAK
                });
            }
        })
    })
});
