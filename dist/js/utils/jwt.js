"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const app_error_1 = require("./app.error");
const verifyJWT = async (token) => {
    return await new Promise((resolve) => {
        jsonwebtoken_1.default.verify(token, config_1.jwtConfig.secret, {}, (err, decoded) => {
            if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                if (err.message === errorMsgs_1.ERROR_MSGS.JWT_INVALID_TOKEN) {
                    throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.SESSION_EXPIRED, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
                }
                if (err.message === errorMsgs_1.ERROR_MSGS.JWT_MALFORMED ||
                    err.message === errorMsgs_1.ERROR_MSGS.JWT_INVALID_SIGNATURE) {
                    throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.SESSION_DATA_TAMPERED, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
                }
            }
            if (err)
                throw new app_error_1.AppError(err.message, httpCodes_1.HTTPCODES.BAD_REQUEST);
            if (!decoded)
                throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.TOKEN_INFO_RETRIEVAL_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
            resolve(decoded);
        });
    });
};
exports.verifyJWT = verifyJWT;
const generateJWT = async (data) => {
    return await new Promise((resolve) => {
        jsonwebtoken_1.default.sign(data, config_1.jwtConfig.secret, { expiresIn: config_1.jwtConfig.expiresIn }, (err, token) => {
            if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                if (err.message === errorMsgs_1.ERROR_MSGS.JWT_INVALID_TOKEN) {
                    throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.SESSION_EXPIRED, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
                }
                if (err.message === errorMsgs_1.ERROR_MSGS.JWT_MALFORMED ||
                    err.message === errorMsgs_1.ERROR_MSGS.JWT_INVALID_SIGNATURE) {
                    throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.SESSION_DATA_TAMPERED, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
                }
            }
            if (err)
                throw new app_error_1.AppError(err.message, httpCodes_1.HTTPCODES.BAD_REQUEST);
            if (!token)
                throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.TOKEN_GENERATION_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
            resolve(token);
        });
    });
};
exports.generateJWT = generateJWT;
