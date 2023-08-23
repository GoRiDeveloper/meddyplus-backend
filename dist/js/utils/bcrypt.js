"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const app_error_1 = require("./app.error");
const hashPassword = async (pass) => {
    try {
        const saltToHash = await bcrypt_1.default.genSalt(config_1.salt);
        return await bcrypt_1.default.hash(pass, saltToHash);
    }
    catch (e) {
        throw new app_error_1.AppError('Ocurrio un error al encriptar la contraseña.', 500);
    }
};
exports.hashPassword = hashPassword;
const comparePasswords = async (pass, hashPass) => {
    let isCorrect;
    try {
        isCorrect = await bcrypt_1.default.compare(pass, hashPass);
    }
    catch (e) {
        throw new app_error_1.AppError('Ocurrio un error al comparar las contraseñas.', 500);
    }
    if (!isCorrect)
        throw new app_error_1.AppError('Contraseña incorrecta.', 400);
};
exports.comparePasswords = comparePasswords;
