"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
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
    async updateDoctor(doctor) {
        return await this.entityFactory.updateOne(doctor);
    }
}
exports.DoctorService = DoctorService;
