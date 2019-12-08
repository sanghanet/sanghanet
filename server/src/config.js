const { logManager, closeLogger, FILENAME_MAX_LENGTH } = require('./logManager');
const log = logManager.createLogger('src/config.js'.padEnd(FILENAME_MAX_LENGTH));

const fatalError = (errorMessage) => {
    log.fatal(errorMessage);
    closeLogger().then(process.exit);
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
    } else {
        env.parsed.NODE_ENV = process.env.NODE_ENV;
        log.info('Environmennt variables: ', env.parsed);
    }
}

module.exports = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT
};
