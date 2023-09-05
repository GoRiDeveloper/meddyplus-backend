"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const entity_service_1 = require("./entity.service");
class PatientService {
    //private readonly patientRepository: PatientRepository
    entityService;
    constructor(paientRepository) {
        //this.patientRepository = paientRepository
        this.entityService = new entity_service_1.EntityService(paientRepository);
    }
    async findPatient(filters, attributes, relationAttributes, error) {
        return (await this.entityService.findOne(filters, attributes, relationAttributes, error));
    }
    async createPatient(patient) {
        return (await this.entityService.create(patient));
    }
}
exports.PatientService = PatientService;
