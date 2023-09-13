"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityFactory = void 0;
const errorMsgs_1 = require("../../constants/errorMsgs");
const httpCodes_1 = require("../../constants/httpCodes");
const app_error_1 = require("../../utils/app.error");
class EntityFactory {
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
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.RESOURCE_NOT_FOUND, httpCodes_1.HTTPCODES.NOT_FOUND);
        return entity;
    }
    async create(data, listeners) {
        const created = this.entityRepository.create(data);
        try {
            return await this.entityRepository.save(created, { listeners });
        }
        catch (e) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.RESOURCE_CREATION_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
    }
    async updateOne(data) {
        return await this.entityRepository.save(data, { listeners: false });
    }
}
exports.EntityFactory = EntityFactory;
