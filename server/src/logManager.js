const log4js = require('log4js');

log4js.configure({
    appenders: {
        out: { type: 'stdout', layout: { type: 'colored' } },
        file: {
            type: 'file',
            filename: 'logs/'.concat(new Date().toISOString().replace(/:/g, '.').slice(0, -5).concat('.utc.log'))
        }
    },
    categories: { default: { appenders: ['out', 'file'], level: 'info' } }
});

const log = log4js.getLogger('src/logManager.js');
log.info('Log service starting.');

// // Log levels with decreasing verbosity!
// // trace, debug, info, warn, error and fatal

// // Set log level like that:
// // log.level = 'trace';

module.exports = {
    log4js: log4js
};
