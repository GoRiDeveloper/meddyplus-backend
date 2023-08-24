"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_dto_1 = require("../dto/user.dto");
const user_types_1 = require("../types/user.types");
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const entity_service_1 = require("./entity.service");
const app_error_1 = require("../utils/app.error");
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
    async createUser(user) {
        user.password = await (0, bcrypt_1.hashPassword)(user.password);
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
    async disableUser(id) {
        const data = { id, status: user_types_1.UserStatus.disable };
        try {
            await this.entityService.updateOne(data);
        }
        catch (e) {
            throw new app_error_1.AppError('El usuario no pudo deshabilitarse.', 500);
        }
    }
}
exports.UserService = UserService;
