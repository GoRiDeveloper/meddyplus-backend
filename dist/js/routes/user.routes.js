"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const schema_middleware_1 = require("../middlewares/schema.middleware");
const user_middleware_1 = require("../middlewares/user.middleware");
const id_schema_1 = require("../schema/id.schema");
const auth_routes_1 = require("./auth.routes");
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.use('/auth', auth_routes_1.authRouter);
exports.userRouter.use('/:id', auth_middleware_1.protect, (0, schema_middleware_1.schemaValidator)(id_schema_1.idSchema), user_middleware_1.userExists, user_middleware_1.validateYourUser);
// userRouter.get('users' getUsers )
// userRouter.put('/users/:id', updateUser)
exports.userRouter.delete('/:id', user_controller_1.deleteUser);
