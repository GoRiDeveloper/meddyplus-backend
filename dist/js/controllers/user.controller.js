"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singIn = exports.signUp = void 0;
const entities_factory_1 = require("../services/factory/entities.factory");
const app_error_1 = require("../utils/app.error");
const signUp = async (req, res, next) => {
    try {
        const user = await entities_factory_1.userService.createUser(req.safeData?.body);
        return res.status(201).json({
            status: 'success',
            user
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError))
            return next(new app_error_1.AppError('No Se Pudo Guardar El Usuario.', 500));
        next(err);
    }
};
exports.signUp = signUp;
const singIn = async (req, res, next) => {
    try {
        const { token, user } = await entities_factory_1.userService.signIn(req.safeData?.body);
        return res.status(200).json({
            status: 'success',
            token,
            user
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError))
            return next(new app_error_1.AppError('No se pudo autenticar el usuario.', 500));
        next(err);
    }
};
exports.singIn = singIn;
