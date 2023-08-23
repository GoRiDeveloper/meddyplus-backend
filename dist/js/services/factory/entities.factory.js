"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const entities_1 = require("../../entities");
const database_config_1 = require("../database/database.config");
const user_service_1 = require("../user.service");
const userRepository = database_config_1.AppDataSrc.getRepository(entities_1.User);
(() => {
    exports.userService = new user_service_1.UserService(userRepository);
})();
