"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMedicalRecord = void 0;
const app_error_1 = require("../utils/app.error");
const httpCodes_1 = require("../constants/httpCodes");
const services_1 = require("../services");
const msgs_1 = require("../constants/msgs");
// controller de prueba para verificar relaciones correctamente
// export const getMedicalRecord = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.safeData?.params
//     const medicalRecord = await medicalRecordService.getMedicalRecord(id)
//     return res.status(HTTPCODES.OK).json({
//       status: MESSAGES.SUCCESS,
//       medicalRecord
//     })
//   } catch (err) {
//     if (!(err instanceof AppError)) {
//       next(
//         new AppError(
//           'No se pudo obtener el registro médico.',
//           HTTPCODES.INTERNAL_SERVER_ERROR
//         )
//       )
//       return
//     }
//     next(err)
//   }
// }
const createMedicalRecord = async (req, res, next) => {
    try {
        const { safeData } = req;
        const medicalRecord = await services_1.medicalRecordService.createMedicalRecord(safeData?.body, safeData?.params.id);
        return res.status(httpCodes_1.HTTPCODES.CREATED).json({
            status: msgs_1.MESSAGES.SUCCESS,
            medicalRecord
        });
    }
    catch (err) {
        if (!(err instanceof app_error_1.AppError)) {
            next(new app_error_1.AppError('', httpCodes_1.HTTPCODES.INTERNAL_SERVER_ERROR));
            return;
        }
        next(err);
    }
};
exports.createMedicalRecord = createMedicalRecord;
