"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const entity_service_1 = require("./entity.service");
class PatientService {
    patientRepository;
    entityService;
    constructor(paientRepository) {
        this.patientRepository = paientRepository;
        this.entityService = new entity_service_1.EntityService(paientRepository);
    }
    async createPatient(patient) {
        await this.entityService.create(patient);
    }
}
exports.PatientService = PatientService;
