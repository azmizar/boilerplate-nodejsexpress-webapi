'use strict';

const MODULENAME = 'StartupServer';

/**
 * Load .env
 */
require('dotenv').config({ path: './config/.env' });

/**
 * NodeJS imports
 */
const http = require('http');

/**
 * App imports
 */
const logger = require('./config/winston.config');
const app = require('./app');

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Starts server
 */
function startServer() {
  const taskName = 'startServer()';

  try {
  } catch (e) {
    logger.logError('', MODULENAME, taskName, e);
  }
}

// Start the server
startServer();
