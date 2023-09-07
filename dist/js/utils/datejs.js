"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secondsToOnlyDate = exports.dateToSecondsToString = exports.secondsToDate = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const secondsToDate = (dateInSeconds) => dayjs_1.default.unix(Number(dateInSeconds)).format('YYYY-MM-DD HH:mm');
exports.secondsToDate = secondsToDate;
const dateToSecondsToString = (date) => (0, dayjs_1.default)(date).unix().toString();
exports.dateToSecondsToString = dateToSecondsToString;
const secondsToOnlyDate = (dateInSeconds) => dayjs_1.default.unix(Number(dateInSeconds)).format('YYYY-MM-DD');
exports.secondsToOnlyDate = secondsToOnlyDate;
