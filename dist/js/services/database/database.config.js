"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSrc = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const config_1 = require("../../config/config");
exports.AppDataSrc = new typeorm_1.DataSource(config_1.dbConfig);
