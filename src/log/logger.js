const {createLogger, format, transports} = require('winston');
const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  //levels: 'error',
  transports: [
    new transports.Console({ level: 'error' }),
    new transports.File({
      filename: process.env.LOG_FILE_NAME,
      level: 'info'
    }),
    new transports.File({
      filename: 'asd.log',
      level: 'error'
    })
  ]
});

const logInfo = (data) => {
    logger.info({
        level: 'info',
        message: data
      });
}

const logError = (data) => {    
  logger.error({
        level: 'error',
        message: data
      });
}

const logDebug = (data) => {
    logger.debug({
        level: 'debug',
        message: data
      });
}

  module.exports = {
    logInfo,
    logError,
    logDebug
  }