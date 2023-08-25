"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCEPTED_ORIGIN = exports.dbConfig = exports.jwtConfig = exports.modes = exports.salt = exports.port = exports.mode = void 0;
require("dotenv/config");
const entities_1 = require("../entities");
const ENV = process.env;
exports.mode = ENV.NODE_ENV;
exports.port = ENV.PORT ?? 4444;
exports.salt = Number(ENV.SALT);
exports.modes = Object.freeze({
    dev: 'development',
    prod: 'production'
});
exports.jwtConfig = {
    secret: ENV.JWT_SECRET ?? 'alguntokensecreto',
    expiresIn: ENV.JWT_EXPIRES_IN ?? '2h'
};
exports.dbConfig = Object.freeze({
    type: ENV.DB_TYPE,
    host: ENV.DB_HOST,
    port: Number(ENV.DB_PORT),
    username: ENV.DB_USER,
    password: ENV.DB_PASS,
    database: ENV.DB_NAME,
    logging: false,
    synchronize: true,
    ssl: {
        ca: ENV.SSL_CERT,
        rejectUnauthorized: false
    },
    entities: [
        entities_1.User,
        entities_1.Patient,
        entities_1.Doctor,
        entities_1.MedicalAppointment,
        entities_1.MedicalRecord,
        entities_1.PatientMedicalHistory
    ]
});
exports.ACCEPTED_ORIGIN = 'http://localhost:3000';
