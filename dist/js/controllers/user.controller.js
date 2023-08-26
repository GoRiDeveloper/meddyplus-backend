"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updatePassword = exports.singIn = exports.signUp = void 0;
const errorMsgs_1 = require("../constants/errorMsgs");
const httpCodes_1 = require("../constants/httpCodes");
const msgs_1 = require("../constants/msgs");
const entities_factory_1 = require("../services/factory/entities.factory");
const app_error_1 = require("../utils/app.error");
const signUp = async (req, res, next) => {
    try {
        const user = await entities_factory_1.userService.createUser(req.safeData?.body);
        return res.status(httpCodes_1.HTTPCODES.CREATED).json({
            status: msgs_1.MESSAGES.SUCCESS,
            user
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.USER_SAVE_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.signUp = signUp;
const singIn = async (req, res, next) => {
    try {
        const { token, user } = await entities_factory_1.userService.signIn(req.safeData?.body);
        return res.status(httpCodes_1.HTTPCODES.OK).json({
            status: msgs_1.MESSAGES.SUCCESS,
            token,
            user
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.USER_AUTHENTICATION_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.singIn = singIn;
const updatePassword = async (req, res, next) => {
    try {
        const { user, safeData } = req;
        await entities_factory_1.userService.updateUserPass(user, safeData?.body);
        return res.status(httpCodes_1.HTTPCODES.NO_CONTENT).json({
            status: msgs_1.MESSAGES.SUCCESS
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.PASSWORD_CHANGE_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.updatePassword = updatePassword;
// //Leer los usuarios
// export const getUsers = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
//   ) =>{
//   try {
//     const users = await userService.getUsers User.find()
//     return res.json(users)
//   } catch (err) {
//     if (!(err instanceof AppError))
//       return next(new AppError('No se pudo autenticar el usuario.', 500))
//     next(err)
//   }
//     next()
// }
// export const updateUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) =>{
//  try {
//   const {id} = req.params;
//   const user = await User.findOneBy({ id: parseInt(req.params.id)});
//   if (!user) return res.status(404).json({message: "User does not exists"})
//   await User.update({ id: parseInt(id)}, req.body)
//  } catch (err) {
//   if (!(err instanceof AppError))
//    return next(new AppError('No se pudo autenticar el usuario.', 500))
//   next(err)
//  }
// }
const deleteUser = async (req, res, next) => {
    try {
        await entities_factory_1.userService.disableUser(req.safeData?.params);
        return res.status(httpCodes_1.HTTPCODES.NO_CONTENT).json({
            status: msgs_1.MESSAGES.SUCCESS
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError(errorMsgs_1.ERROR_MSGS.USER_AUTHENTICATION_ERROR, httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.deleteUser = deleteUser;
// export const getUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
//   )=>{
//    try {
//     const {id} = req.params
//     const user = await User.findOneBy({id: parseInt(id)})
//     return res.json(user)
//    } catch (err) {
//     if (!(err instanceof AppError))
//       return next(new AppError('No se pudo autenticar el usuario.', 500))
//     next(err)
//    }
//   }
