'use strict';

/***************************************
 * Server startup script
 ***************************************/
const MODULENAME = 'StartupServer';

/**
 * Startup script
 */
require('module-alias/register');
require('@root/config/paths-alias.config');

// exception for pathAlias since we need it to reolve config
const pathAlias = require('path-alias');
require('dotenv').config({ path: pathAlias.resolve('config/.env') });

/**
 * NodeJS imports
 */
const http = require('http');

/**
 * App imports
 */
const logger = require('@root/config/winston.config');
const app = require('@root/app');

/**
 * Internal variables
 */
let _server = null;
let _serverUniqueID = null;
let _serverPort = null;

/**
 * Normalize a port into a number or string for port number or named pipe respectively
 * @param {*} val Port to listen to either as integer or string for port number or named pipe respectively
 * @returns {*} Integer or string or throws Error
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

  throw new Error(`Invalid port value: ${val}`);
}

/**
 * Handles error event from HTTP server
 * @param {Error} error Error object
 */
function onError(error) {
  const taskName = 'onError()';

  try {
    // Unexpected error
    if (error.syscall !== 'listen') {
      throw error;
    }

    // get the port
    let bind = typeof _serverPort === 'string' ? `Pipe ${_serverPort}` : `Port ${_serverPort}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        throw new Error(`${bind} requires elevated privileges`);

      case 'EADDRINUSE':
        throw new Error(`${bind} is already in use`);

      default:
        throw error;
    }
  } catch (e) {
    logger.logError(_serverUniqueID, MODULENAME, taskName, e);
    logger.logInfo(_serverUniqueID, MODULENAME, taskName, 'Exiting server due to error');

    process.exit(1);
  }
}

/**
 * Handles HTTP server listening
 */
function onListening() {
  const taskName = 'onListening()';

  let addr = _server.address();

  logger.logInfo(_serverUniqueID, MODULENAME, taskName, `API Version: ${process.env.APIVERSION}`);
  logger.logInfo(_serverUniqueID, MODULENAME, taskName, `API Port: ${addr.port}`);
  logger.logInfo(_serverUniqueID, MODULENAME, taskName, `Build Version: ${process.env.npm_package_version || '--NOT AVAILABLE--'}`);
  logger.logInfo(_serverUniqueID, MODULENAME, taskName, `NODE_ENV: ${process.env.NODE_ENV}`);
}

/**
 * Starts server
 */
function startServer() {
  const taskName = 'startServer()';

  try {
    // unique ID for this server
    _serverUniqueID = process.env.SERVERUNIQUEID;

    // get and set port
    _serverPort = normalizePort(process.env.APIPORT);
    app.set('port', _serverPort);

    // create server
    _server = http.createServer(app);
    _server.listen(_serverPort);
    _server.on('error', onError);
    _server.on('listening', onListening);
  } catch (e) {
    logger.logError(_serverUniqueID, MODULENAME, taskName, e);
    logger.logInfo(_serverUniqueID, MODULENAME, taskName, 'Exiting server due to unexpected error');

    process.exit(1);
  }
}

// conditional start so that we can expose functionality for mocha to call
if (require.main === module) {
  // Start the server
  startServer();
} else {
  // server is being invoke as module (ex: from mocha)
  module.exports.start = startServer;

  module.exports.shutdown = () => { 
    _server.close();
  };

  module.exports.port = () => {
    return app.get('port');
  };
}

