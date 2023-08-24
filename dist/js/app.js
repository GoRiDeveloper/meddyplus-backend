"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middlewares/error.middleware");
const index_1 = require("./routes/index");
const config_1 = require("./config/config");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({ credentials: true, origin: config_1.ACCEPTED_ORIGIN, methods: ['POST'] }));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use('/api/v1', index_1.router);
exports.app.use(error_middleware_1.globalErrorHandler);
