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
const _1 = require("./");
let MedicalRecord = exports.MedicalRecord = class MedicalRecord extends typeorm_1.BaseEntity {
    id;
    date;
    allergies;
    previousMedicalConditions;
    familyMedicalHistory;
    patient;
    patientMedicalHistory;
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
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], MedicalRecord.prototype, "allergies", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'previous_medical_conditions' }),
    __metadata("design:type", String)
], MedicalRecord.prototype, "previousMedicalConditions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'family_medical_history' }),
    __metadata("design:type", String)
], MedicalRecord.prototype, "familyMedicalHistory", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((_type) => _1.Patient),
    (0, typeorm_1.JoinColumn)({ name: 'patient_id' }),
    __metadata("design:type", _1.Patient)
], MedicalRecord.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => _1.PatientMedicalHistory, (patientMedicalHistory) => patientMedicalHistory.medicalRecord),
    __metadata("design:type", Array)
], MedicalRecord.prototype, "patientMedicalHistory", void 0);
exports.MedicalRecord = MedicalRecord = __decorate([
    (0, typeorm_1.Entity)({ name: 'medical_records' })
], MedicalRecord);
