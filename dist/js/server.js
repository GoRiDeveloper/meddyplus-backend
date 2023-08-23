"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config/config");
const database_config_1 = require("./services/database/database.config");
const dbStartUp = async () => {
    try {
        await database_config_1.AppDataSrc.initialize();
    }
    catch (error) {
        console.log('❌ Error', error);
    }
};
dbStartUp().then(() => console.log('All good'));
const server = app_1.app.listen(config_1.port, () => console.log('Server connected on port', config_1.port));
server.on('error', (e) => console.error(`Server error: ${e}`));
