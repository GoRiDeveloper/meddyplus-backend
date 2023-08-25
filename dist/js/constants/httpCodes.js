"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPCODES = void 0;
var HTTPCODES;
(function (HTTPCODES) {
    /**
     * Standard response for successful HTTP requests.
     * The actual response will depend on the request method used.
     * In a GET request, the response will contain an entity corresponding to the requested resource.
     * In a POST request, the response will contain an entity describing or containing the result of the action.
     */
    HTTPCODES[HTTPCODES["OK"] = 200] = "OK";
    /**
     * The request has been fulfilled, resulting in the creation of a new resource.
     */
    HTTPCODES[HTTPCODES["CREATED"] = 201] = "CREATED";
    /**
     * The server cannot or will not process the request due to an apparent client error
     * (e.g., malformed request syntax, too large size, invalid request message framing,
     * or deceptive request routing).
     */
    HTTPCODES[HTTPCODES["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    /**
     * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet
     * been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the
     * requested resource. See Basic access authentication and Digest access authentication. 401 semantically means
     * "unauthenticated",i.e. the user does not have the necessary credentials.
     */
    HTTPCODES[HTTPCODES["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    /**
     * "The request was a valid request, but the server is refusing to respond to it.
     * The user might be logged in but does not have the necessary permissions for the resource."
     */
    HTTPCODES[HTTPCODES["FORBIDDEN"] = 403] = "FORBIDDEN";
    /**
     * The requested resource could not be found but may be available in the future.
     * Subsequent requests by the client are permissible.
     */
    HTTPCODES[HTTPCODES["NOT_FOUND"] = 404] = "NOT_FOUND";
    /**
     * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
     */
    HTTPCODES[HTTPCODES["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    /**
     * The request was well-formed but was unable to be followed due to semantic errors.
     */
    HTTPCODES[HTTPCODES["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
})(HTTPCODES || (exports.HTTPCODES = HTTPCODES = {}));
