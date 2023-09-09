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
exports.MedicalAppointment = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let MedicalAppointment = exports.MedicalAppointment = class MedicalAppointment extends typeorm_1.BaseEntity {
    id;
    description;
    medicalAppointmentDate;
    patient;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], MedicalAppointment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], MedicalAppointment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((_type) => _1.MedicalAppointmentDates),
    (0, typeorm_1.JoinColumn)({ name: 'medical_appointment_date_id' }),
    __metadata("design:type", _1.MedicalAppointmentDates)
], MedicalAppointment.prototype, "medicalAppointmentDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_type) => _1.Patient, (patient) => patient.medicalAppointments),
    (0, typeorm_1.JoinColumn)({ name: 'patient_id' }),
    __metadata("design:type", _1.Patient)
], MedicalAppointment.prototype, "patient", void 0);
exports.MedicalAppointment = MedicalAppointment = __decorate([
    (0, typeorm_1.Entity)({ name: 'medical_appointments' })
], MedicalAppointment);
