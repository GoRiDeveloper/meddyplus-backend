"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const path_not_found_middleware_1 = require("../middlewares/path.not.found.middleware");
const user_routes_1 = require("./user.routes");
exports.router = (0, express_1.Router)();
exports.router.use('/users', user_routes_1.userRouter);
exports.router.all('*', path_not_found_middleware_1.pathNotFound);
