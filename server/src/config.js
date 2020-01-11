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

const variablesToExport = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    DB_NAME: process.env.DB_NAME,
    COLL_NAME: process.env.COLL_NAME,
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
    // add new entries here ...
};

if (env.error) {
    fatalError('Environment setup is incorrect!');
} else {
    for (const key in variablesToExport) {
        const value = variablesToExport[key];
        if (!value) fatalError(`${key} is undefined in ${envPath}!`);
    }
    env.parsed.NODE_ENV = process.env.NODE_ENV;
    log.info('Environmennt variables: \n', env.parsed);
};

module.exports = variablesToExport;
