"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.protect = void 0;
const app_error_1 = require("../utils/app.error");
const jwt_1 = require("../utils/jwt");
const entities_factory_1 = require("../services/factory/entities.factory");
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
    if (!token)
        return next(new app_error_1.AppError('No haz iniciado sesión, ¡Por favor inicia sesión!.', 401));
    const decoded = (await (0, jwt_1.verifyJWT)(token));
    const attributes = {
        password: false,
        status: false
    };
    const userExists = await entities_factory_1.userService.findUser({ id: decoded.id }, attributes, false, false);
    if (!userExists)
        return next(new app_error_1.AppError('El usuario del token no existe.', 404));
    if (userExists.passwordChangedAt) {
        const convertToSeconds = userExists.passwordChangedAt.getTime() / 1000;
        const changedTimeStamp = parseInt(convertToSeconds.toString(), 10);
        if (decoded.iat < changedTimeStamp)
            return next(new app_error_1.AppError('El usuario cambio su contraseña recientemente. Vuelve a iniciar sesión.', 401));
    }
    req.sessionUser = userExists;
    next();
};
exports.protect = protect;
const restrictTo = (...roles) => {
    return (req, _res, next) => {
        if (!roles.includes(req.sessionUser?.role))
            return next(new app_error_1.AppError('Acción denegada, no tienes permisos.', 403));
        next();
    };
};
exports.restrictTo = restrictTo;
