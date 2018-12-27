'use strict';

/***************************************
 * Winston logger configurations
 ***************************************/
const MODULENAME = 'ConfigWinstonLogger';

/**
 * Startup script
 */
require('module-alias/register');
require('@root/config/paths-alias.config');

/**
 * NodeJS imports
 */
const path = require('path');
const fs = require('fs');

/***
 * 3rd party imports
 */
const pathAlias = require('path-alias');
const winston = require('winston');
const split = require('split');

/**
 * Init log folder
 */
function initLog() {
  const taskName = 'initLog()';

  try {
    // get dir from log file path
    let logDir = path.dirname(pathAlias.resolve(process.env.ALLLOGFILE));

    console.log(`[${ MODULENAME }:${ taskName }] Creating log folder ${ logDir }`);
    fs.mkdirSync(logDir, { "recursive": true });
  } catch (e) {
    // at this time winston has not been initialize - so just use console()
    console.log(`[${ MODULENAME }:${ taskName }] ${ e.message }`);
  }
}

// initialize log
initLog();

/**
 * Create default logger that will handle all
 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      name: 'alllogs',
      level: 'info',
      filename: pathAlias.resolve(process.env.ALLLOGFILE),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      maxRetries: 10,
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
      name: 'console',
      format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.align(), winston.format.printf((info) => `${info.timestamp} ${info.level}:\t${info.message}`)),
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  );
}

/**
 * Export (must define export of logger here first before adding more functions below)
 */
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
  if (o instanceof Error) {
    logger.error(`[${uniqueID}] [${moduleName}:${taskName}] ${o.message}`);
    logger.debug(`[${uniqueID}] [${moduleName}:${taskName}] ${o.stack}`);
  } else {
    logger.error(`[${uniqueID}] [${moduleName}:${taskName}] ${o}`);
  }
};
