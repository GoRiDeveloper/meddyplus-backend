"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalAppointmentDatesService = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const app_error_1 = require("../utils/app.error");
const unify_dates_1 = require("../utils/unify.dates");
const entity_service_1 = require("./entity.service");
const entities_factory_1 = require("./factory/entities.factory");
class MedicalAppointmentDatesService {
    entityService;
    constructor(medicalAppointmentDatesRepository) {
        this.entityService = new entity_service_1.EntityService(medicalAppointmentDatesRepository);
    }
    async createMedicalAppointmentDates(sessionUser, date, hours) {
        const unifiedDates = (0, unify_dates_1.unifyDates)(date, hours);
        let doctorCreated;
        const doctorExists = await entities_factory_1.doctorService.findDoctor({ user: { id: sessionUser.id } }, false, false, false);
        if (!doctorExists) {
            const doctorToCreate = {
                user: sessionUser
            };
            doctorCreated = await entities_factory_1.doctorService.createDoctor(doctorToCreate);
            if (!doctorCreated)
                throw new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.CREATE_DOCTOR_SERVICE_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR);
        }
        const createDates = unifiedDates.map(async (date) => {
            const dateInSeconds = (0, dayjs_1.default)(date).unix().toString();
            // Buscaamos la fecha recibida convertida a sec en la BD
            const dateFromDB = await this.findMedicalAppointmentDate({ date: dateInSeconds }, false, false, false);
            if (!dateFromDB || dateFromDB.date !== dateInSeconds) {
                const createDate = { date: dateInSeconds };
                createDate.doctor = doctorExists || doctorCreated;
                const dateCreated = await this.entityService.create(createDate);
                return dateCreated;
            }
            if (dateFromDB) {
                return dateFromDB;
            }
        });
        return (await Promise.all(createDates));
    }
    async findMedicalAppointmentDate(filters, attributes, relationAttributes, error) {
        return (await this.entityService.findOne(filters, attributes, relationAttributes, error));
    }
    async updateMedicalAppointmentDate(medicalAppoinmentDate) {
        return await this.entityService.updateOne(medicalAppoinmentDate);
    }
}
exports.MedicalAppointmentDatesService = MedicalAppointmentDatesService;
