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
const entity_factory_1 = require("./factory/entity.factory");
const _1 = require(".");
class UserService {
    entityFactory;
    constructor(userRepository) {
        this.entityFactory = new entity_factory_1.EntityFactory(userRepository);
    }
    async findUser(filters, attributes, relationAttributes, error) {
        return await this.entityFactory.findOne(filters, attributes, relationAttributes, error);
    }
    async findAllUsers(filters, attributes, relationAttributes) {
        return await this.entityFactory.findAll(filters, attributes, relationAttributes);
    }
    async findAllDoctorsAndAdmins(sessionId) {
        const filters = [
            {
                id: (0, typeorm_1.Not)(sessionId),
                role: (0, typeorm_1.In)([user_types_1.UserRole.admin, user_types_1.UserRole.doctor])
            }
        ];
        const attributes = {
            dateOfBirth: true,
            telephone: true,
            firstName: true,
            lastName: true,
            status: true,
            email: true,
            genre: true,
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
        const userToBeUpdated = await this.entityFactory.findOne(filters, attributes, false, false);
        if (!userToBeUpdated)
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.ADMIN_REGISTRATION_APPROVAL_FAIL, httpCodes_1.HTTPCODES.BAD_REQUEST);
        userToBeUpdated.status = user_types_1.UserStatus.enable;
        try {
            return await this.entityFactory.updateOne(userToBeUpdated);
        }
        catch (error) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.ADMIN_REGISTRATION_APPROVAL_ERROR, httpCodes_1.HTTPCODES.BAD_REQUEST);
        }
    }
    async cancelAdminDocsRegistration(userId) {
        const filters = {
            id: userId,
            status: (0, typeorm_1.In)([user_types_1.UserStatus.pending, user_types_1.UserStatus.enable])
        };
        const attributes = {
            firstName: true,
            lastName: true,
            status: true,
            email: true,
            role: true,
            id: true
        };
        const userToBeCanceled = await this.entityFactory.findOne(filters, attributes, false, false);
        if (!userToBeCanceled) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.ADMIN_REGISTRATION_CANCELATION_FAIL, httpCodes_1.HTTPCODES.NOT_FOUND);
        }
        await this.disableUser(Number(userId));
    }
    async createUser(user) {
        const assignedUser = (0, check_role_for_assignment_1.checkRoleForAssignment)(user);
        assignedUser.password = await (0, bcrypt_1.hashPassword)(user.password);
        const userCreated = (await this.entityFactory.create(assignedUser, false));
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
        try {
            const [, token, isDoctor, isPatient] = await Promise.all([
                (0, bcrypt_1.comparePasswords)(loginData.password, user.password),
                (0, jwt_1.generateJWT)({ id: user.id }),
                _1.doctorService.findDoctor({ user: { id: user.id } }, false, false, false),
                _1.patientService.findPatient({ user: { id: user.id } }, false, false, false)
            ]);
            const userToReturn = (0, user_dto_1.userDto)(user);
            if (isDoctor) {
                userToReturn.doctorId = isDoctor.id;
            }
            if (isPatient) {
                userToReturn.patientId = isPatient.id;
            }
            return {
                token,
                user: userToReturn
            };
        }
        catch (err) {
            if (err instanceof app_error_1.AppError) {
                throw err;
            }
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.SIGNIN_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
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
            await this.entityFactory.updateOne(data);
        }
        catch (e) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PASSWORD_CHANGE_ERROR, httpCodes_1.HTTPCODES.BAD_REQUEST);
        }
    }
    async disableUser(id) {
        try {
            await this.entityFactory.updateOne({ id, status: user_types_1.UserStatus.disable });
        }
        catch (e) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.USER_DISABLE_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.UserService = UserService;
