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
exports.PatientMedicalHistory = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let PatientMedicalHistory = exports.PatientMedicalHistory = class PatientMedicalHistory extends typeorm_1.BaseEntity {
    id;
    date;
    notes;
    symptoms;
    treatments;
    medication;
    height;
    bloodPressure;
    weight;
    medicalRecord;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], PatientMedicalHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], PatientMedicalHistory.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PatientMedicalHistory.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PatientMedicalHistory.prototype, "symptoms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PatientMedicalHistory.prototype, "treatments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], PatientMedicalHistory.prototype, "medication", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PatientMedicalHistory.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'blood_pressure' }),
    __metadata("design:type", String)
], PatientMedicalHistory.prototype, "bloodPressure", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PatientMedicalHistory.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_type) => _1.MedicalRecord),
    (0, typeorm_1.JoinColumn)({ name: 'medical_record_id' }),
    __metadata("design:type", Number)
], PatientMedicalHistory.prototype, "medicalRecord", void 0);
exports.PatientMedicalHistory = PatientMedicalHistory = __decorate([
    (0, typeorm_1.Entity)({ name: 'patients_medical_history' })
], PatientMedicalHistory);
