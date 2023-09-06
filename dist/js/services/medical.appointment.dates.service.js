"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalAppointmentDatesService = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const app_error_1 = require("../utils/app.error");
const unify_dates_1 = require("../utils/unify.dates");
const entity_factory_1 = require("./factory/entity.factory");
const _1 = require("./");
const datejs_1 = require("../utils/datejs");
class MedicalAppointmentDatesService {
    entityFactory;
    constructor(medicalAppointmentDatesRepository) {
        this.entityFactory = new entity_factory_1.EntityFactory(medicalAppointmentDatesRepository);
    }
    async createMedicalAppointmentDates(sessionUser, date, hours) {
        const unifiedDates = (0, unify_dates_1.unifyDates)(date, hours);
        let doctorCreated;
        const doctorExists = await _1.doctorService.findDoctor({ user: { id: sessionUser.id } }, false, false, false);
        if (!doctorExists) {
            const doctorToCreate = {
                user: sessionUser
            };
            doctorCreated = await _1.doctorService.createDoctor(doctorToCreate);
            if (!doctorCreated)
                throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.CREATE_DOCTOR_SERVICE_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
        const createDates = unifiedDates.map(async (date) => {
            const idToCompared = doctorExists?.id || doctorCreated?.id;
            const dateInSeconds = (0, datejs_1.dateToSecondsToString)(date);
            // Función para crear una nueva cita
            const createNewDate = async () => {
                const createDate = { date: dateInSeconds };
                createDate.doctor = doctorExists || doctorCreated;
                return await this.entityFactory.create(createDate);
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
        const datesCreated = await Promise.all(createDates);
        const convertDates = datesCreated.map((medicalAppoinmentDate) => {
            return {
                ...medicalAppoinmentDate,
                date: (0, datejs_1.secondsToDate)(medicalAppoinmentDate.date)
            };
        });
        return convertDates;
    }
    async findMedicalAppointmentDate(filters, attributes, relationAttributes, error) {
        return (await this.entityFactory.findOne(filters, attributes, relationAttributes, error));
    }
    async updateMedicalAppointmentDate(medicalAppoinmentDate) {
        return await this.entityFactory.updateOne(medicalAppoinmentDate);
    }
}
exports.MedicalAppointmentDatesService = MedicalAppointmentDatesService;
