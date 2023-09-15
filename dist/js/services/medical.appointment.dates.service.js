"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalAppointmentDatesService = void 0;
const typeorm_1 = require("typeorm");
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const medical_appointment_dates_types_1 = require("../types/medical.appointment.dates.types");
const app_error_1 = require("../utils/app.error");
const datejs_1 = require("../utils/datejs");
const unify_dates_1 = require("../utils/unify.dates");
const _1 = require("./");
const entity_factory_1 = require("./factory/entity.factory");
class MedicalAppointmentDatesService {
    entityFactory;
    constructor(medicalAppointmentDatesRepository) {
        this.entityFactory = new entity_factory_1.EntityFactory(medicalAppointmentDatesRepository);
    }
    async createMedicalAppointmentDates(sessionUser, date, hours) {
        const unifiedDates = (0, unify_dates_1.unifyDates)(date, hours);
        let doctorCreated;
        let doctorId;
        const doctorExists = await _1.doctorService.findDoctor({ user: { id: sessionUser.id } }, false, false, false);
        if (!doctorExists) {
            const doctorToCreate = {
                user: sessionUser
            };
            doctorCreated = await _1.doctorService.createDoctor(doctorToCreate);
            if (!doctorCreated)
                throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.CREATE_DOCTOR_SERVICE_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
            doctorId = doctorCreated.id;
        }
        if (doctorExists) {
            doctorId = doctorExists.id;
        }
        const createDates = unifiedDates.map(async (date) => {
            const idToCompared = doctorExists?.id || doctorCreated?.id;
            const dateInSeconds = (0, datejs_1.dateToSecondsToString)(date);
            // Función para crear una nueva cita
            const createNewDate = async () => {
                const createDate = { date: dateInSeconds };
                createDate.doctor = doctorExists || doctorCreated;
                return await this.entityFactory.create(createDate, true);
            };
            // Busca la fecha en la BD para el doctor actual
            const dateFromDB = await this.findMedicalAppointmentDate({ date: dateInSeconds, doctor: { id: idToCompared } }, false, { doctor: true }, false);
            if (!dateFromDB) {
                return await createNewDate();
            }
            else if (dateFromDB.date === dateInSeconds &&
                dateFromDB.doctor.id !== idToCompared) {
                return await createNewDate();
            }
            return dateFromDB;
        });
        return {
            medicalAppointmentDates: await Promise.all(createDates),
            doctorId
        };
    }
    async findMedicalAppointmentDate(filters, attributes, relationAttributes, error) {
        return (await this.entityFactory.findOne(filters, attributes, relationAttributes, error));
    }
    async updateMedicalAppointmentDate(medicalAppoinmentDate) {
        return await this.entityFactory.updateOne(medicalAppoinmentDate);
    }
    // Cambia el estado de la fecha de una cita médica a:
    // selected --> cancelled
    // pending <--> cancelled, y viceversa
    async toggleStatusMedicalAppointmentDate(id, sessionUser) {
        const doctorExists = await _1.doctorService.findDoctor({ user: { id: sessionUser.id } }, false, false, false);
        const date = await this.findMedicalAppointmentDate({ id }, false, { doctor: true }, true);
        if (!date) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_DATE_INVALID_FORMAT, httpCodes_1.HTTPCODES.NOT_FOUND);
        }
        if (doctorExists === null) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.DOCTOR_WITHOUT_APPOINTMENTS, httpCodes_1.HTTPCODES.NOT_FOUND);
        }
        if (date.doctor.id !== doctorExists.id) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PERMISSION_DENIAD, httpCodes_1.HTTPCODES.BAD_REQUEST);
        }
        switch (date.status) {
            case medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.selected:
                date.status = medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.cancelled;
                break;
            case medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.cancelled:
                date.status = medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.pending;
                break;
            case medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.pending:
                date.status = medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.cancelled;
                break;
        }
        try {
            await this.updateMedicalAppointmentDate(date);
        }
        catch (error) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.TOGGLE_STATUS_MEDICAL_APPOINTMENT_DATE_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
    }
    async findMedicalAppointmentDates(filters, attributes, relationAttributes) {
        return await this.entityFactory.findAll(filters, attributes, relationAttributes);
    }
    // Get para traer todas las fechas que un médico previamente subió al sistema
    async getAllMedicalAppoitmentDates(id) {
        const doctorExists = await _1.doctorService.findDoctor({ user: { id } }, false, false, false);
        if (doctorExists === null) {
            return [[], 0];
        }
        const filters = {
            doctor: { id: doctorExists.id },
            status: (0, typeorm_1.In)([
                medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.cancelled,
                medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.pending,
                medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.selected
            ])
        };
        const relationAttributes = { doctor: true };
        return await this.findMedicalAppointmentDates(filters, false, relationAttributes);
    }
    // Solo trae las fechas selected y pending
    async getAllMedicalAppoitmentDatesPendingAndSelected(id) {
        const doctorExists = await _1.doctorService.findDoctor({ user: { id } }, false, false, false);
        if (doctorExists === null) {
            return [[]];
        }
        const filters = {
            doctor: { id: doctorExists.id },
            status: (0, typeorm_1.In)([
                medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.pending,
                medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.selected
            ])
        };
        const relationAttributes = { doctor: true };
        return await this.findMedicalAppointmentDates(filters, false, relationAttributes);
    }
    async completedAppointmentDate(medicalAppoinmentDateId) {
        const medicalAppoinmentDateToUpdate = {
            id: medicalAppoinmentDateId,
            status: medical_appointment_dates_types_1.MedicalAppointmentDatesStatus.completed
        };
        try {
            await this.updateMedicalAppointmentDate(medicalAppoinmentDateToUpdate);
        }
        catch (err) {
            throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATE_UPDATE_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.MedicalAppointmentDatesService = MedicalAppointmentDatesService;
