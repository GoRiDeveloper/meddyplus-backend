"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const app_error_1 = require("./app.error");
const hashPassword = async (pass) => {
    try {
        const saltToHash = await bcrypt_1.default.genSalt(config_1.salt);
        return await bcrypt_1.default.hash(pass, saltToHash);
    }
    catch (e) {
        throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PASSWORD_ENCRYPTION_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
    }
};
exports.hashPassword = hashPassword;
const comparePasswords = async (pass, hashPass) => {
    let isCorrect;
    try {
        isCorrect = await bcrypt_1.default.compare(pass, hashPass);
    }
    catch (e) {
        throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PASSWORD_COMPARISON_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
    }
    if (!isCorrect)
        throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.INCORRECT_PASSWORD, httpCodes_1.HTTPCODES.BAD_REQUEST);
};
exports.comparePasswords = comparePasswords;
