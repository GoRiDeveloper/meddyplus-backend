"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const entity_factory_1 = require("./factory/entity.factory");
class PatientService {
    // private readonly patientRepository: PatientRepository
    entityFactory;
    constructor(paientRepository) {
        // this.patientRepository = paientRepository
        this.entityFactory = new entity_factory_1.EntityFactory(paientRepository);
    }
    async findPatient(filters, attributes, relationAttributes, error) {
        return (await this.entityFactory.findOne(filters, attributes, relationAttributes, error));
    }
    async createPatient(patient) {
        return (await this.entityFactory.create(patient, false));
    }
}
exports.PatientService = PatientService;
