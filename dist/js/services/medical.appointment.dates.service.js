"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalAppointmentDatesService = void 0;
const entity_service_1 = require("./entity.service");
class MedicalAppointmentDatesService {
    medicalAppointmentDatesRepository;
    entityService;
    constructor(medicalAppointmentDatesRepository) {
        this.medicalAppointmentDatesRepository = medicalAppointmentDatesRepository;
        this.entityService = new entity_service_1.EntityService(medicalAppointmentDatesRepository);
    }
    async createMedicalAppointmentDate() { }
    async getMedicalAppointmentDates() { }
}
exports.MedicalAppointmentDatesService = MedicalAppointmentDatesService;
