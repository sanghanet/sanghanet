const { log4js } = require('./logManager');
const log = log4js.getLogger('src/config.js');

const fatalError = (errorMessage) => {
    log.fatal(errorMessage);
    log4js.shutdown(process.exit);
};

let envPath = `${__dirname}`;
switch (process.env.NODE_ENV) {
    case 'local': envPath += '/../.env.local'; break;
    case 'atlas': envPath += '/../.env.atlas'; break;
    default:
}

const env = require('dotenv').config({ path: envPath });

if (env.error) {
    fatalError('Environment setup is incorrect!');
} else {
    if (!process.env.DEV_SERVER) {
        fatalError(`DEV_SERVER is undefined in ${envPath}!`);
    } else if (!process.env.DB_URL) {
        fatalError(`DB_URL is undefined in ${envPath}!`);
    } else if (!process.env.PORT) {
        fatalError(`PORT is undefined in ${envPath}!`);
    } else if (!process.env.DB_NAME) {
        fatalError(`DB_NAME is undefined in ${envPath}!`);
    } else if (!process.env.COLL_NAME) {
        fatalError(`COLL_NAME is undefined in ${envPath}!`);
    } else if (!process.env.CLIENT_ID) {
        fatalError(`CLIENT_ID is undefined in ${envPath}!`);
    } else if (!process.env.CLIENT_SECRET) {
        fatalError(`CLIENT_SECRET is undefined in ${envPath}!`);
    } else if (!process.env.SESSION_SECRET) {
        fatalError(`SESSION_SECRET is undefined in ${envPath}!`);
    } else {
        env.parsed.NODE_ENV = process.env.NODE_ENV;
        log.info('Environmennt variables: \n', env.parsed);
    }
}

const APP_PORT = process.env.DEV_SERVER === '1' ? 3000 : process.env.PORT;
if (APP_PORT === 3000) {
    log.info('APPLICATION developer server should run on port: ', 3000);
} else {
    log.info('Application developer server is DISABLED! BUILD the software to use latest version!');
}

module.exports = {
    APP_PORT: APP_PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    DB_NAME: process.env.DB_NAME,
    COLL_NAME: process.env.COLL_NAME,
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
};
