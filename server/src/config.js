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
    if (!process.env.DB_URL) {
        fatalError(`DB_URL is undefined in ${envPath}!`);
    } else if (!process.env.PORT) {
        fatalError(`PORT is undefined in ${envPath}!`);
    } else if (!process.env.DB_NAME) {
        fatalError(`DB_NAME is undefined in ${envPath}!`);
    } else if (!process.env.COLL_NAME) {
        fatalError(`COLL_NAME is undefined in ${envPath}!`);
    } else if (!process.env.CLIENT_ID) {
        fatalError(`CLIENT_ID is undefined in ${envPath}!`);
    } else if (!process.env.SESSION_SECRET) {
        fatalError(`SESSION_SECRET is undefined in ${envPath}!`);
    } else {
        env.parsed.NODE_ENV = process.env.NODE_ENV;
        log.info('Environmennt variables: \n', env.parsed);
    }
}

module.exports = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    DB_NAME: process.env.DB_NAME,
    COLL_NAME: process.env.COLL_NAME,
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    CLIENT_ID: process.env.CLIENT_ID
};
