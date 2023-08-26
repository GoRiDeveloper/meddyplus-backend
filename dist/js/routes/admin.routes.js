"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_types_1 = require("../types/user.types");
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.get('/high-level-roles', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)(user_types_1.UserRole.admin), admin_controller_1.getAllDoctorsAndAdmins);
