const logManager = require('simple-node-logger').createLogManager();

const FILENAME_MAX_LENGTH = 24;

logManager.createRollingFileAppender({
    logDirectory: 'logs', // This directory MUST exist to avoid 'Error: ENOENT: no such file or directory,' error @ start
    fileNamePattern: '<DATE>.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
});

const log = logManager.createLogger('src/logManager.js'.padEnd(FILENAME_MAX_LENGTH));
log.info('Server starting.');

// Log levels with decreasing verbosity!
// trace, debug, info, warn, error and fatal

// Set log level like that:
// log.setLevel('trace');

const closeLogger = () => {
    return new Promise((resolve, reject) => {
        log.info('Server shut down.');
        setInterval(() => {
            resolve();
            process.exit(0);
        }, 200);
    });
};

process.on('SIGINT', closeLogger);

module.exports = {
    logManager: logManager,
    closeLogger: closeLogger,
    FILENAME_MAX_LENGTH: FILENAME_MAX_LENGTH
};
