"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathNotFound = void 0;
const pathNotFound = (req, res, _next) => {
    return res.status(404).json({
        status: 'fail',
        message: `La Ruta ${req.originalUrl} No Se Encontro.`
    });
};
exports.pathNotFound = pathNotFound;
