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
exports.MedicalAppointmentDates = void 0;
const typeorm_1 = require("typeorm");
const medical_appointments_dates_types_1 = require("../types/medical.appointments.dates.types");
const doctor_entity_1 = require("./doctor.entity");
let MedicalAppointmentDates = exports.MedicalAppointmentDates = class MedicalAppointmentDates extends typeorm_1.BaseEntity {
    id;
    date;
    status;
    doctor;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], MedicalAppointmentDates.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], MedicalAppointmentDates.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        default: medical_appointments_dates_types_1.MedicalAppointmentDatesStatus.pending,
        enum: medical_appointments_dates_types_1.MedicalAppointmentDatesStatus
    }),
    __metadata("design:type", String)
], MedicalAppointmentDates.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_type) => doctor_entity_1.Doctor, (doctor) => doctor.medicalAppointmentDates),
    __metadata("design:type", doctor_entity_1.Doctor)
], MedicalAppointmentDates.prototype, "doctor", void 0);
exports.MedicalAppointmentDates = MedicalAppointmentDates = __decorate([
    (0, typeorm_1.Entity)({ name: 'medical_appointments_dates' })
], MedicalAppointmentDates);
