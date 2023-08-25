"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDoctorsAndAdmins = void 0;
const httpCodes_1 = require("../constants/httpCodes");
const user_dto_1 = require("../dto/user.dto");
const entities_factory_1 = require("../services/factory/entities.factory");
const user_types_1 = require("../types/user.types");
const app_error_1 = require("../utils/app.error");
const getAllDoctorsAndAdmins = async (req, res, next) => {
    try {
        const filters = [
            {
                role: user_types_1.UserRole.admin
            },
            { role: user_types_1.UserRole.doctor }
        ];
        const [users, results] = await entities_factory_1.userService.findAllUsers(filters, false, false);
        const filteredUsers = (0, user_dto_1.highLevelUsersDto)(users);
        return res.status(httpCodes_1.HTTPCODES.OK).json({
            status: 'succes',
            users: filteredUsers,
            count: results
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError('No se pudo obtener los médicos y administradores.', 500));
            return;
        }
        next(err);
    }
};
exports.getAllDoctorsAndAdmins = getAllDoctorsAndAdmins;
