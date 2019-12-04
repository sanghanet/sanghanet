const { logManager, closeLogger, FILENAME_MAX_LENGTH } = require('./logManager');
const log = logManager.createLogger('src/config.js'.padEnd(FILENAME_MAX_LENGTH));

let envPath = `${__dirname}`;
switch (process.env.NODE_ENV) {
    case 'local': envPath += '/../.env.local'; break;
    case 'atlas': envPath += '/../.env.atlas'; break;
    default:
}

const env = require('dotenv').config({ path: envPath });

if (env.error) {
    log.fatal('Environment setup is incorrect!');
    closeLogger().then(process.exit);
} else {
    env.parsed.NODE_ENV = process.env.NODE_ENV;
    log.info('Environment variables: ', env.parsed);
}

module.exports = {
    DB_URL: `${process.env.DB_URL}`,
    PORT: process.env.PORT || null
};
