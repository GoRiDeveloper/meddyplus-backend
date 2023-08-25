"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highLevelUsersDto = exports.userDto = void 0;
const userDto = (user) => {
    const { firstName, lastName, telephone, dateOfBirth, genre, email, role } = user;
    return {
        firstName,
        lastName,
        email,
        telephone,
        dateOfBirth,
        genre,
        role
    };
};
exports.userDto = userDto;
const highLevelUsersDto = (users) => {
    return users.map((user) => {
        const { firstName, lastName, telephone, dateOfBirth, genre, email, role } = user;
        return {
            firstName,
            lastName,
            email,
            telephone,
            dateOfBirth,
            genre,
            role
        };
    });
};
exports.highLevelUsersDto = highLevelUsersDto;
