"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const app_error_1 = require("./app.error");
const verifyJWT = (token) => {
    return new Promise((res, rej) => {
        jsonwebtoken_1.default.verify(token, config_1.jwtConfig.secret, {}, (err, decoded) => {
            if (err)
                throw new app_error_1.AppError(err.message, 400);
            if (!decoded)
                throw new app_error_1.AppError('No se pudo recuperar la información del token.', 500);
            res(decoded);
        });
    });
};
exports.verifyJWT = verifyJWT;
const generateJWT = (data) => {
    return new Promise((res, rej) => {
        jsonwebtoken_1.default.sign(data, config_1.jwtConfig.secret, { expiresIn: config_1.jwtConfig.expiresIn }, (err, token) => {
            if (err)
                throw new app_error_1.AppError(err.message, 400);
            if (!token)
                throw new app_error_1.AppError('No se genero el token.', 500);
            res(token);
        });
    });
};
exports.generateJWT = generateJWT;
