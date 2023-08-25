"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidator = void 0;
const httpCodes_1 = require("../constants/httpCodes");
const msgs_1 = require("../constants/msgs");
const app_error_1 = require("../utils/app.error");
const schemaValidator = (schema) => {
    return async (req, _res, next) => {
        const results = await schema.safeParseAsync({
            body: req.body,
            params: req.params
        });
        if (!results.success) {
            const errors = results.error.issues.map((issue) => {
                if (issue.message === msgs_1.MESSAGES.DATE_OF_BIRTH_DEFAULT_ERROR) {
                    issue.message = msgs_1.MESSAGES.DATE_OF_BIRTH_INVALID_DATE;
                }
                return {
                    code: issue.code,
                    path: issue.path,
                    message: issue.message
                };
            });
            next(new app_error_1.AppError(errors, httpCodes_1.HTTPCODES.BAD_REQUEST));
            return;
        }
        req.safeData = results.data;
        next();
    };
};
exports.schemaValidator = schemaValidator;
