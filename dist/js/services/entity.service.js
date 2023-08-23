"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityService = void 0;
const app_error_1 = require("../utils/app.error");
class EntityService {
    entityRepository;
    constructor(repository) {
        this.entityRepository = repository;
    }
    async findAll(filters, attributes, relationAttributes) {
        return await this.entityRepository.findAndCount({
            where: filters,
            ...(attributes && { select: attributes }),
            ...(relationAttributes && { relations: relationAttributes })
        });
    }
    async findOne(filters, attributes, relationAttributes, error) {
        const entity = await this.entityRepository.findOne({
            where: filters,
            ...(attributes && { select: attributes }),
            ...(relationAttributes && { relations: relationAttributes })
        });
        if (!entity && error)
            throw new app_error_1.AppError('No Se Encontro El Recurso.', 404);
        return entity;
    }
    async create(data) {
        const created = this.entityRepository.create(data);
        try {
            return await this.entityRepository.save(created, { listeners: false });
        }
        catch (e) {
            throw new app_error_1.AppError('No se pudo crear el recurso en la base de datos.', 500);
        }
    }
    async updateOne(data) {
        return await this.entityRepository.save(data, { listeners: false });
    }
}
exports.EntityService = EntityService;
