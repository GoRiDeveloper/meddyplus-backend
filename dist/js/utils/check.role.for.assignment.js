"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoleForAssignment = void 0;
const user_types_1 = require("../types/user.types");
const high_level_roles_1 = require("./high.level.roles");
const checkRoleForAssignment = (user) => {
    if (high_level_roles_1.highLevelRoles.includes(user.role)) {
        user.status = user_types_1.UserStatus.pending;
    }
    return user;
};
exports.checkRoleForAssignment = checkRoleForAssignment;
