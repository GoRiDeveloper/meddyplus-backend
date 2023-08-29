"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGenre = exports.UserStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["admin"] = "admin";
    UserRole["patient"] = "patient";
    UserRole["doctor"] = "doctor";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["enable"] = "enable";
    UserStatus["disable"] = "disable";
    UserStatus["pending"] = "pending";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var UserGenre;
(function (UserGenre) {
    UserGenre["male"] = "male";
    UserGenre["female"] = "female";
})(UserGenre || (exports.UserGenre = UserGenre = {}));
