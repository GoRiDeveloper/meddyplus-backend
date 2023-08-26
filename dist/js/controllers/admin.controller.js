"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDoctorsAndAdmins = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const msgs_1 = require("../constants/msgs");
const user_dto_1 = require("../dto/user.dto");
const entities_factory_1 = require("../services/factory/entities.factory");
const user_types_1 = require("../types/user.types");
const app_error_1 = require("../utils/app.error");
const getAllDoctorsAndAdmins = async (req, res, next) => {
    try {
        const requesterId = req.sessionUser?.id;
        const filters = [
            {
                role: user_types_1.UserRole.admin
            },
            { role: user_types_1.UserRole.doctor }
        ];
        const [users, results] = await entities_factory_1.userService.findAllUsers(filters, false, false);
        const usersMinusRequester = users.filter((user) => user.id !== requesterId);
        const filteredUsers = (0, user_dto_1.highLevelUsersDto)(usersMinusRequester);
        return res.status(httpCodes_1.HTTPCODES.OK).json({
            status: msgs_1.MESSAGES.SUCCESS,
            users: filteredUsers,
            count: results - 1
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.GET_DOCTORS_AND_ADMINS_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.getAllDoctorsAndAdmins = getAllDoctorsAndAdmins;
