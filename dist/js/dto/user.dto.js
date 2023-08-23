"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDto = void 0;
const userDto = (user) => {
    const { firstName, lastName, telephone, dateOfBirth, genre, email } = user;
    return {
        firstName,
        lastName,
        email,
        telephone,
        dateOfBirth,
        genre
    };
};
exports.userDto = userDto;
