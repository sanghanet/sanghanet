const logManager = require('simple-node-logger').createLogManager();

const FILENAME_MAX_LENGTH = 24;

logManager.createFileAppender({
    logFilePath: 'logs/'.concat(new Date().toISOString().replace(/:/g, '.').slice(0, -5).concat('.utc.log')),
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
});

const log = logManager.createLogger('src/logManager.js'.padEnd(FILENAME_MAX_LENGTH));
log.info('Log service starting.');

// Log levels with decreasing verbosity!
// trace, debug, info, warn, error and fatal

// Set log level like that:
// log.setLevel('trace');

const closeLogger = () => {
    return new Promise((resolve, reject) => {
        log.info('Server shut down.');
        setInterval(() => { resolve(); }, 10);
    });
};

module.exports = {
    logManager: logManager,
    closeLogger: closeLogger,
    FILENAME_MAX_LENGTH: FILENAME_MAX_LENGTH
};
