"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpError = void 0;
const httpError = (err, _req, res, _next) => {
    console.log(err);
    return res.status(500).json({
        status: 'error',
        message: 'Algo Fallo :('
    });
};
exports.httpError = httpError;
