import dotenv from 'dotenv';
import { log4js } from './logManager';
const log = log4js.getLogger('config.js');

const fatalError = (errorMessage: string) => {
    log.fatal(errorMessage);
    log4js.shutdown(() => process.exit());
};

let envPath = __dirname;
switch (process.env.NODE_ENV) {
    case 'local': envPath += '/../.env.local'; break;
    case 'atlas': envPath += '/../.env.atlas'; break;
    default:
}

const env = dotenv.config({ path: envPath });

const baseVariablesToExport: BaseVariablesToExport = {
    SESSION_SECRET: process.env.SESSION_SECRET || '',
    DB_URL: process.env.DB_URL || '',
    PORT: process.env.PORT || '',
    CLIENT_ID: process.env.CLIENT_ID || '',
    CLIENT_SECRET: process.env.CLIENT_SECRET || ''
    // add new entries here ...
};

if (env.error) {
    fatalError('Environment setup is incorrect!');
} else {
    for (const [key, value] of Object.entries(baseVariablesToExport)) {
        if (!value) fatalError(`${key} is undefined in ${envPath}!`);
    }
    env.parsed && (env.parsed.NODE_ENV = process.env.NODE_ENV || '');
    log.info('Environmennt variables: \n', env.parsed);
}

let serverRoot, appPort;
if (process.env.DEV_SERVER === '1') {
    serverRoot = '../client/public';
    appPort = '3000';

    log.info('APPLICATION developer server should run on port: ', 3000);
} else {
    serverRoot = 'app';
    appPort = process.env.PORT || '';

    log.info('Application developer server is DISABLED! BUILD the software to use latest version!');
}

const variablesToExport: VariablesToExport = {
    ...baseVariablesToExport,
    SERVER_ROOT: serverRoot,
    APP_PORT: appPort
};
log.info('SERVER_ROOT: ', variablesToExport.SERVER_ROOT);

export const {
    SESSION_SECRET,
    DB_URL,
    PORT,
    CLIENT_ID,
    CLIENT_SECRET,
    SERVER_ROOT,
    APP_PORT
} = variablesToExport;
