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
exports.Doctor = void 0;
const typeorm_1 = require("typeorm");
const doctor_types_1 = require("../types/doctor.types");
const medical_appointmet_dates_entity_1 = require("./medical.appointmet.dates.entity");
const user_entity_1 = require("./user.entity");
let Doctor = exports.Doctor = class Doctor extends typeorm_1.BaseEntity {
    id;
    user;
    medicalAppointmentDates;
    specialty;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Doctor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((_type) => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Doctor.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => medical_appointmet_dates_entity_1.MedicalAppointmentDates, (medicalAppointmentsDates) => medicalAppointmentsDates),
    __metadata("design:type", Array)
], Doctor.prototype, "medicalAppointmentDates", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: doctor_types_1.DoctorSpecialty.general }),
    __metadata("design:type", String)
], Doctor.prototype, "specialty", void 0);
exports.Doctor = Doctor = __decorate([
    (0, typeorm_1.Entity)({ name: 'doctors' })
], Doctor);
