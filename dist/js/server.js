"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config/config");
const errorMsgs_1 = require("./constants/errorMsgs");
const msgs_1 = require("./constants/msgs");
const database_config_1 = require("./services/database/database.config");
const dbStartUp = async () => {
    try {
        await database_config_1.AppDataSrc.initialize();
    }
    catch (error) {
        console.log(errorMsgs_1.ERROR_MSGS.ERROR, error);
    }
};
void dbStartUp().then(() => {
    console.log(msgs_1.MESSAGES.DB_START_UP_OK);
});
const server = app_1.app.listen(config_1.port, () => {
    console.log(msgs_1.MESSAGES.SERVER_CONNECTED_ON_PORT, config_1.port);
});
server.on(errorMsgs_1.ERROR_MSGS.ERROR, (e) => {
    console.error(errorMsgs_1.ERROR_MSGS.SERVER_ERROR, e);
});
