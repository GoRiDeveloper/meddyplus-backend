"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const app_error_1 = require("../utils/app.error");
const entity_factory_1 = require("./factory/entity.factory");
class DoctorService {
    doctorRepository;
    entityFactory;
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
        this.entityFactory = new entity_factory_1.EntityFactory(doctorRepository);
    }
    async createDoctor(doctor) {
        return await this.doctorRepository.save(doctor);
    }
    async findDoctor(filters, attributes, relationAttributes, error) {
        return (await this.entityFactory.findOne(filters, attributes, relationAttributes, error));
    }
    async findDoctors(filters, attributes, relationAttributes) {
        const doctors = await this.entityFactory.findAll(filters, attributes, relationAttributes);
        if (doctors[1] < 1) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.DOCTORS_NOT_FOUND, httpCodes_1.HTTPCODES.NOT_FOUND);
        }
        return doctors;
    }
    async updateDoctor(doctor) {
        return await this.entityFactory.updateOne(doctor);
    }
}
exports.DoctorService = DoctorService;
