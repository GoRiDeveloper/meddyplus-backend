"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyArrayDuplicates = void 0;
const verifyArrayDuplicates = (array) => new Set(array).size < array.length;
exports.verifyArrayDuplicates = verifyArrayDuplicates;
