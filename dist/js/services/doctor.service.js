"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const entity_service_1 = require("./entity.service");
class DoctorService {
    doctorRepository;
    entityService;
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
        this.entityService = new entity_service_1.EntityService(doctorRepository);
    }
    async createDoctor(doctor) {
        return await this.doctorRepository.save(doctor);
    }
    async findDoctor(filters, attributes, relationAttributes, error) {
        return (await this.entityService.findOne(filters, attributes, relationAttributes, error));
    }
    async updateDoctor(doctor) {
        return await this.entityService.updateOne(doctor);
    }
}
exports.DoctorService = DoctorService;
