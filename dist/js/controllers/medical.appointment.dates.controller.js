"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDates = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const msgs_1 = require("../constants/msgs");
const entities_factory_1 = require("../services/factory/entities.factory");
const app_error_1 = require("../utils/app.error");
const createDates = async (req, res, next) => {
    try {
        const { sessionUser } = req;
        const { date, hours } = req.safeData?.body;
        const medicalAppointmentDates = await entities_factory_1.medicalAppointmentDatesService.createMedicalAppointmentDates(sessionUser, date, hours);
        const datesToFrontEnd = medicalAppointmentDates.map((ele) => {
            return {
                ...ele,
                date: dayjs_1.default.unix(Number(ele.date)).format('YYYY-MM-DD HH:mm')
            };
        });
        return res.status(httpCodes_1.HTTPCODES.CREATED).json({
            status: msgs_1.MESSAGES.SUCCESS,
            message: msgs_1.MESSAGES.MEDICAL_APPOINTMENT_DATE_CREATED,
            medicalAppointmentDates: datesToFrontEnd
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.MEDICAL_APPOINTMENT_DATE_CREATE_FAIL, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.createDates = createDates;
