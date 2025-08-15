import log4js from 'log4js';

log4js.configure({
    appenders: {
        console: { type: 'console' },
        errorFile: { type: 'file', filename: 'logs/error.log' },
        combinedFile: { type: 'file', filename: 'logs/combined.log' },
    },
    categories: {
        default: { appenders: ['console', 'combinedFile'], level: 'info' },
        error: { appenders: ['console', 'errorFile'], level: 'error' },
    },
});

const logger = log4js.getLogger('info');
const errorLogger = log4js.getLogger('error');

export { logger, errorLogger };
