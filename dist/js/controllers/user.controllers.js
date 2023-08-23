"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singIn = exports.signUp = void 0;
const signUp = (_req, res) => {
    res.send('singup');
};
exports.signUp = signUp;
const singIn = (_req, res) => {
    res.send('singIn');
};
exports.singIn = singIn;
