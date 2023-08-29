"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typeorm_1 = require("typeorm");
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const user_dto_1 = require("../dto/user.dto");
const user_types_1 = require("../types/user.types");
const app_error_1 = require("../utils/app.error");
const bcrypt_1 = require("../utils/bcrypt");
const check_role_for_assignment_1 = require("../utils/check.role.for.assignment");
const jwt_1 = require("../utils/jwt");
const entity_service_1 = require("./entity.service");
class UserService {
    userRepository;
    entityService;
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.entityService = new entity_service_1.EntityService(userRepository);
    }
    async findUser(filters, attributes, relationAttributes, error) {
        return await this.entityService.findOne(filters, attributes, relationAttributes, error);
    }
    async findAllUsers(filters, attributes, relationAttributes) {
        return await this.entityService.findAll(filters, attributes, relationAttributes);
    }
    async findAllDoctorsAndAdmins(sessionId) {
        const filters = [
            {
                id: (0, typeorm_1.Not)(sessionId),
                role: (0, typeorm_1.In)([user_types_1.UserRole.admin, user_types_1.UserRole.doctor])
            }
        ];
        const attributes = {
            firstName: true,
            lastName: true,
            status: true,
            email: true,
            role: true,
            id: true
        };
        return await this.findAllUsers(filters, attributes, false);
    }
    async approveAdminDocsRegistration(userId) {
        const filters = {
            id: userId,
            status: (0, typeorm_1.In)([user_types_1.UserStatus.disable, user_types_1.UserStatus.pending])
        };
        const attributes = {
            firstName: true,
            lastName: true,
            status: true,
            email: true,
            role: true,
            id: true
        };
        const userToBeUpdated = await this.entityService.findOne(filters, attributes, false, false);
        if (!userToBeUpdated)
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.ADMIN_REGISTRATION_APPROVAL_FAIL, httpCodes_1.HTTPCODES.BAD_REQUEST);
        const dataToUpdate = {
            id: userId,
            status: user_types_1.UserStatus.enable
        };
        try {
            return await this.entityService.updateOne(dataToUpdate);
        }
        catch (error) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.ADMIN_REGISTRATION_APPROVAL_ERROR, httpCodes_1.HTTPCODES.BAD_REQUEST);
        }
    }
    async cancelAdminDocsRegistration(userId) {
        const attributes = {
            firstName: true,
            lastName: true,
            status: true,
            email: true,
            role: true,
            id: true
        };
        const userToBeCanceled = await this.entityService.findOne({ id: userId }, attributes, false, false);
        if (userToBeCanceled == null) {
            return null;
        }
        else {
            if (userToBeCanceled?.status === user_types_1.UserStatus.enable) {
                try {
                    await this.disableUser(Number(userId));
                    const updatedUser = { ...userToBeCanceled };
                    updatedUser.status = user_types_1.UserStatus.disable;
                    return {
                        ...updatedUser
                    };
                }
                catch (error) {
                    throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.ADMIN_REGISTRATION_APPROVAL_ERROR, httpCodes_1.HTTPCODES.BAD_REQUEST);
                }
            }
        }
        return null;
    }
    async createUser(user) {
        const assignedUser = (0, check_role_for_assignment_1.checkRoleForAssignment)(user);
        assignedUser.password = await (0, bcrypt_1.hashPassword)(user.password);
        const userCreated = (await this.entityService.create(assignedUser));
        return (0, user_dto_1.userDto)(userCreated);
    }
    async signIn(loginData) {
        const attributes = {
            id: true,
            firstName: true,
            lastName: true,
            password: true,
            role: true
        };
        const user = (await this.findUser({ email: loginData.email }, attributes, false, true));
        const [, token] = await Promise.all([
            (0, bcrypt_1.comparePasswords)(loginData.password, user.password),
            (0, jwt_1.generateJWT)({ id: user.id })
        ]);
        return {
            token,
            user: (0, user_dto_1.userDto)(user)
        };
    }
    async updateUserPass(userToUpdate, passwords) {
        const { currentPassword, newPassword } = passwords;
        if (currentPassword === newPassword)
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.SAME_PASSWORD_EROR, httpCodes_1.HTTPCODES.BAD_REQUEST);
        await (0, bcrypt_1.comparePasswords)(currentPassword, userToUpdate.password);
        const data = {
            id: userToUpdate.id,
            password: await (0, bcrypt_1.hashPassword)(newPassword),
            passwordChangedAt: new Date()
        };
        try {
            await this.entityService.updateOne(data);
        }
        catch (e) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PASSWORD_CHANGE_ERROR, httpCodes_1.HTTPCODES.BAD_REQUEST);
        }
    }
    async disableUser(id) {
        try {
            await this.entityService.updateOne({ id, status: user_types_1.UserStatus.disable });
        }
        catch (e) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.USER_DISABLE_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.UserService = UserService;
