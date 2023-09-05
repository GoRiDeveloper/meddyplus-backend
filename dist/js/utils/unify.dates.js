"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unifyDates = void 0;
const unifyDates = (date, hours) => {
    return hours.map((hour) => {
        return date.concat(' ').concat(hour).concat(':00');
    });
};
exports.unifyDates = unifyDates;
