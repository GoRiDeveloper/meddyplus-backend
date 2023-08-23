"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const auth_routes_1 = require("./auth.routes");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.use('/auth', auth_routes_1.authRouter);
