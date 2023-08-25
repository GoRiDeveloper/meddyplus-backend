"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const errorMsgs_1 = require("../constants/errorMsgs");
exports.idSchema = zod_1.default.object({
    params: zod_1.default.object({
        id: zod_1.default.string().transform((id, ctx) => {
            const parsed = parseInt(id);
            if (isNaN(parsed))
                ctx.addIssue({
                    code: zod_1.default.ZodIssueCode.custom,
                    message: errorMsgs_1.ERROR_MSGS.ID_TYPE_MISMATCH
                });
            return parsed;
        })
    })
});
