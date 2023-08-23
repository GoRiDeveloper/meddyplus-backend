"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecord = void 0;
const typeorm_1 = require("typeorm");
const patient_entity_1 = require("./patient.entity");
const patient_medical_history_entity_1 = require("./patient.medical.history.entity");
const doctor_entity_1 = require("./doctor.entity");
let MedicalRecord = exports.MedicalRecord = class MedicalRecord extends typeorm_1.BaseEntity {
    id;
    date;
    description;
    doctor;
    patientMedicalHistory;
    patient;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], MedicalRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], MedicalRecord.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MedicalRecord.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_type) => doctor_entity_1.Doctor, (doctor) => doctor.medicalRecords),
    __metadata("design:type", doctor_entity_1.Doctor)
], MedicalRecord.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((_type) => patient_medical_history_entity_1.PatientMedicalHistory),
    (0, typeorm_1.JoinColumn)({ name: 'patient_medical_history_id' }),
    __metadata("design:type", String)
], MedicalRecord.prototype, "patientMedicalHistory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_type) => patient_entity_1.Patient, (patient) => patient.medicalRecords),
    __metadata("design:type", patient_entity_1.Patient)
], MedicalRecord.prototype, "patient", void 0);
exports.MedicalRecord = MedicalRecord = __decorate([
    (0, typeorm_1.Entity)({ name: 'medical_records' })
], MedicalRecord);
