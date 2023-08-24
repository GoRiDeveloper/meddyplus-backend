"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateYourUser = exports.userExists = void 0;
const entities_factory_1 = require("../services/factory/entities.factory");
const user_types_1 = require("../types/user.types");
const app_error_1 = require("../utils/app.error");
const userExists = async (req, _res, next) => {
    const { id } = req.safeData?.params;
    const filters = { id, status: user_types_1.UserStatus.enable };
    try {
        const user = (await entities_factory_1.userService.findUser(filters, false, false, false));
        if (!user)
            throw new app_error_1.AppError('No se encontro el usuario.', 404);
        req.user = user;
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            return next(new app_error_1.AppError('No se pudo encontrar el usuario.', 404));
        }
        return next(err);
    }
    next();
};
exports.userExists = userExists;
const validateYourUser = (req, _res, next) => {
    const yourUserId = req.sessionUser?.id;
    const userId = req.user?.id;
    if (yourUserId !== userId)
        return next(new app_error_1.AppError('Solo puedes realizar esta acción con tu usuario.', 403));
    next();
};
exports.validateYourUser = validateYourUser;
