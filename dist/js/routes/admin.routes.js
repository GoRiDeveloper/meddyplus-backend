"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_types_1 = require("../types/user.types");
const schema_middleware_1 = require("../middlewares/schema.middleware");
const id_schema_1 = require("../schema/id.schema");
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.use(auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)(user_types_1.UserRole.admin));
exports.adminRouter.route('/high-level-roles').get(admin_controller_1.getAllDoctorsAndAdmins); // Ruta para obtener doctores y admins
exports.adminRouter
    .use('/high-level-roles/:id', (0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema))
    .route('/high-level-roles/:id')
    .patch(admin_controller_1.approveDoctorsAndAdminsRegistration) // Ruta para aprobar solicitudes de registro
    .delete(admin_controller_1.cancelDoctorsAndAdminsRegistration); // Ruta para cambiar el estado de un doctor o admin a disable
