"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const schema_middleware_1 = require("../middlewares/schema.middleware");
const user_middleware_1 = require("../middlewares/user.middleware");
const id_schema_1 = require("../schema/id.schema");
const login_schema_1 = require("../schema/login.schema");
const user_schema_1 = require("../schema/user.schema");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/signup', (0, schema_middleware_1.schemaValidator)(user_schema_1.userSchema), user_controller_1.signUp);
exports.authRouter.post('/signin', (0, schema_middleware_1.schemaValidator)(login_schema_1.loginSchema), user_controller_1.singIn);
// Se ejecuta para cambiar la contraseña del usuario dentro de la app
exports.authRouter.patch('/password/:id', auth_middleware_1.protect, (0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), (0, schema_middleware_1.schemaValidator)(user_schema_1.passwordsSchema), user_middleware_1.userExists, user_middleware_1.validateYourUser, user_controller_1.updatePassword);
