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
exports.Patient = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Patient = exports.Patient = class Patient extends typeorm_1.BaseEntity {
    id;
    user;
    medicalAppointments;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Patient.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((_type) => _1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", _1.User)
], Patient.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => _1.MedicalAppointment, (medicalApointment) => medicalApointment.patient),
    __metadata("design:type", Array)
], Patient.prototype, "medicalAppointments", void 0);
exports.Patient = Patient = __decorate([
    (0, typeorm_1.Entity)({ name: 'patients' })
], Patient);
