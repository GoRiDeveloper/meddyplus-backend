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
const entity_factory_1 = require("./factory/entity.factory");
const _1 = require("./");
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
            const dateInSeconds = (0, dayjs_1.default)(date).unix().toString();
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
        return await Promise.all(createDates);
    }
    async findMedicalAppointmentDate(filters, attributes, relationAttributes, error) {
        return (await this.entityFactory.findOne(filters, attributes, relationAttributes, error));
    }
    async updateMedicalAppointmentDate(medicalAppoinmentDate) {
        return await this.entityFactory.updateOne(medicalAppoinmentDate);
    }
}
exports.MedicalAppointmentDatesService = MedicalAppointmentDatesService;
