import log4js from 'log4js';

log4js.configure({
    appenders: {
        out: {
            type: 'stdout',
            layout: { type: 'pattern', pattern: '%[%d %p %c:%l%] %m' }
        },
        file: {
            type: 'file',
            filename: 'logs/'.concat(new Date().toISOString().replace(/:/g, '.').slice(0, -5).concat('.utc.log')),
            layout: { type: 'pattern', pattern: '%d %p %c:%l %m' }
        }
    },
    categories: { default: { appenders: ['out', 'file'], level: 'info', enableCallStack: true } }
});

const log = log4js.getLogger('logManager.js');
log.info('Log service starting.');

// // Log levels with decreasing verbosity!
// // trace, debug, info, warn, error and fatal

// // Set log level like that:
// // log.level = 'trace';

export { log4js };
