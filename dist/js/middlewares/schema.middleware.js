"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidator = void 0;
const app_error_1 = require("../utils/app.error");
const schemaValidator = (schema) => {
    return async (req, _res, next) => {
        const results = await schema.safeParseAsync({
            body: req.body,
            params: req.params
        });
        if (!results.success) {
            const errors = results.error.issues.map((issue) => {
                return {
                    code: issue.code,
                    path: issue.path,
                    message: issue.message
                };
            });
            return next(new app_error_1.AppError(errors, 400));
        }
        req.safeData = results.data;
        next();
    };
};
exports.schemaValidator = schemaValidator;
