"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const user_dto_1 = require("../dto/user.dto");
const user_types_1 = require("../types/user.types");
const app_error_1 = require("../utils/app.error");
const bcrypt_1 = require("../utils/bcrypt");
const highLevelRoles_1 = require("../utils/highLevelRoles");
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
    async createUser(user) {
        user.password = await (0, bcrypt_1.hashPassword)(user.password);
        if (highLevelRoles_1.highLevelRoles.includes(user.role)) {
            user.status = user_types_1.UserStatus.disable;
        }
        const userCreated = (await this.entityService.create(user));
        return (0, user_dto_1.userDto)(userCreated);
    }
    async signIn(loginData) {
        const { email, password } = loginData;
        const user = (await this.findUser({ email }, false, false, true));
        const comparePass = (0, bcrypt_1.comparePasswords)(password, user.password);
        const generateToken = (0, jwt_1.generateJWT)({ id: user.id });
        const [, token] = await Promise.all([comparePass, generateToken]);
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
        const encriptedPass = await (0, bcrypt_1.hashPassword)(newPassword);
        const data = {
            id: userToUpdate.id,
            password: encriptedPass,
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
        const data = { id, status: user_types_1.UserStatus.disable };
        try {
            await this.entityService.updateOne(data);
        }
        catch (e) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.USER_DISABLE_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.UserService = UserService;
