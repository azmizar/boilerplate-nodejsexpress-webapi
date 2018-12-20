'use strict';

/***
 * 3rd party imports
 */
const winston = require('winston');
const split = require('split');

/**
 * Create default logger that will handle all
 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: process.env.ALLLOGFILE,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    })
  ],
  exitOnError: false
});

/**
 * Avoid console logger in production
 */
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  );
}

module.exports = logger;

/**
 * stream to use for morgan - using split to remove the last \n added by morgan
 */
module.exports.stream = split().on('data', function(line) {
  logger.info(line);
});

/**
 * Log info entry
 */
module.exports.logInfo = function(uniqueID, moduleName, taskName, msg) {
  logger.info(`[${uniqueID}] [${moduleName}:${taskName}] ${msg}`);
};

/**
 * Log debug entry
 */
module.exports.logDebug = function(uniqueID, moduleName, taskName, msg) {
  logger.debug(`[${uniqueID}] [${moduleName}:${taskName}] ${msg}`);
};

/**
 * Log warning entry
 */
module.exports.logWarning = function(uniqueID, moduleName, taskName, msg) {
  logger.warning(`[${uniqueID}] [${moduleName}:${taskName}] ${msg}`);
};

/**
 * Log error entry
 */
module.exports.logError = function(uniqueID, moduleName, taskName, o) {
  logger.error(`[${uniqueID}] [${moduleName}:${taskName}] ${o.message}`);
  logger.debug(`[${uniqueID}] [${moduleName}:${taskName}] ${o.stackTrace}`);
};
