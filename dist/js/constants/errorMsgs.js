"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MSGS = void 0;
var ERROR_MSGS;
(function (ERROR_MSGS) {
    ERROR_MSGS["FAIL"] = "fail";
    ERROR_MSGS["ERRORS"] = "errors";
    ERROR_MSGS["ERROR"] = "error";
    ERROR_MSGS["GENERIC_ERROR"] = "Algo sali\u00F3 mal \uD83E\uDD79";
    ERROR_MSGS["SESSION_NOT_STARTED"] = "No has iniciado sesi\u00F3n, \u00A1Por favor inicia sesi\u00F3n!.";
    ERROR_MSGS["PERMISSION_DENIAD"] = "Acci\u00F3n denegada, no tienes permisos.";
    ERROR_MSGS["TOKEN_NOT_DECODED"] = "El token no se decodific\u00F3.";
    ERROR_MSGS["TOKEN_USER_NOT_FOUND"] = "El usuario del token no existe.";
    ERROR_MSGS["USER_PASSWORD_CHANGE"] = "El usuario cambi\u00F3 su contrase\u00F1a recientemente. Vuelve a iniciar sesi\u00F3n.";
    ERROR_MSGS["USER_NOT_FOUND"] = "No se encontr\u00F3 el usuario.";
    ERROR_MSGS["USER_SAVE_ERROR"] = "No se pudo guardar el usuario.";
    ERROR_MSGS["USER_AUTHENTICATION_ERROR"] = "No se pudo autenticar el usuario.";
    ERROR_MSGS["USER_DISABLE_ERROR"] = "El usuario no pudo deshabilitarse.";
    ERROR_MSGS["ACTION_RECTRICTED_TO_OWNER"] = "Solo puedes realizar esta acci\u00F3n con tu usuario.";
    ERROR_MSGS["ID_TYPE_MISMATCH"] = "El id debe ser un entero";
    ERROR_MSGS["RESOURCE_NOT_FOUND"] = "No se encontr\u00F3 el recurso.";
    ERROR_MSGS["RESOURCE_CREATION_ERROR"] = "No se pudo crear el recurso en la base de datos.";
    ERROR_MSGS["SAME_PASSWORD_EROR"] = "Tu contrase\u00F1a no puede ser la misma.";
    ERROR_MSGS["PASSWORD_CHANGE_ERROR"] = "No se pudo cambiar la contrase\u00F1a.";
    ERROR_MSGS["PASSWORD_ENCRYPTION_ERROR"] = "Ocurri\u00F3 un error al encriptar la contrase\u00F1a.";
    ERROR_MSGS["PASSWORD_COMPARISON_ERROR"] = "Ocurri\u00F3 un error al comparar las contrase\u00F1as.";
    ERROR_MSGS["INCORRECT_PASSWORD"] = "Contrase\u00F1a incorrecta.";
    ERROR_MSGS["TOKEN_INFO_RETRIEVAL_ERROR"] = "No se pudo recuperar la informaci\u00F3n del token.";
    ERROR_MSGS["JWT_INVALID_TOKEN"] = "invalid token";
    ERROR_MSGS["JWT_MALFORMED"] = "jwt malformed";
    ERROR_MSGS["JWT_INVALID_SIGNATURE"] = "invalid signature";
    ERROR_MSGS["SESSION_EXPIRED"] = "Su sesi\u00F3n ha expirado, inicie sesi\u00F3n nuevamente.";
    ERROR_MSGS["SESSION_DATA_TAMPERED"] = "Los datos de tu sesi\u00F3n han sido manipulados.";
    ERROR_MSGS["TOKEN_GENERATION_ERROR"] = "No se gener\u00F3 el token.";
    ERROR_MSGS["SERVER_ERROR"] = "Error en el servidor.";
    ERROR_MSGS["GET_DOCTORS_AND_ADMINS_ERROR"] = "No se pudo obtener los m\u00E9dicos ni los administradores.";
    ERROR_MSGS["ADMIN_REGISTRATION_APPROVAL_ERROR"] = "Error al aprobar el registro del admin/doctor.";
    ERROR_MSGS["ADMIN_REGISTRATION_APPROVAL_FAIL"] = "El admin/doctor ya ha sido aprobado previamente o no existe.";
    ERROR_MSGS["ADMIN_REGISTRATION_CANCELATION_ERROR"] = "Error al deshabilitar un admin/doctor";
    ERROR_MSGS["ADMIN_REGISTRATION_CANCELATION_FAIL"] = "El admin/doctor ya se encuentra deshabilitado o no existe.";
})(ERROR_MSGS || (exports.ERROR_MSGS = ERROR_MSGS = {}));
