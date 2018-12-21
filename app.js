'use strict';

/***************************************
 * App startup script
 ***************************************/
const MODULENAME = 'StartupApp';

/**
 * 3rd party imports
 */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

/**
 * App imports
 */
const logger = require('./config/winston.config');

/**
 * Internal variables
 */
const _apiRouter = express.Router();

/**
 * Initialize app
 */
function initApp() {
  const taskName = 'initApp()';

  try {
    // add new token to morgan
    morgan.token('reqUniqueid', function(req) {
      return req.reqUniqueID || '--N/A--';
    });

    // overriding 'combined' to include evUniqueID
    app.use(morgan('[:reqUniqueid] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: logger.stream }));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    //middlewares
    //app.use(require('./middlewares/default.middleware'));

    // root route
    let apiRoot = process.env.APIROOT || '';
    let apiVersion = process.env.APIVERSION || 'v1';

    let baseRoute = `/${apiRoot !== '' ? apiRoot : ''}${apiVersion !== '' ? apiVersion : ''}/`;
    logger.logInfo(process.env.SERVERUNIQUEID, MODULENAME, taskName, `Base route: ${baseRoute}`);

    app.use(baseRoute, _apiRouter);

    initPing();
    initCatchAllRoute();
    initErrorRoute();
  } catch (e) {
    logger.logError(process.env.SERVERUNIQUEID, MODULENAME, taskName, e);
    logger.logInfo(process.env.SERVERUNIQUEID, MODULENAME, taskName, 'Exiting server due to error during initializing app');

    process.exit(1);
  }
}

/**
 * Initialize default PING
 */
function initPing() {
  const taskName = '/ping';

  // default ping
  _apiRouter.get('/ping', (req, res) => {
    logger.logDebug(req.reqUniqueID, MODULENAME, taskName, 'PING');
    res.status(200).send({ errCode: 0, errMsg: 'Ping-pong' });
  });
}

/**
 * Initialize catch all route (undefined routes)
 */
function initCatchAllRoute() {
  const taskName = 'undefinedroute';

  app.all('*', (req, res) => {
    logger.logDebug(req.reqUniqueID, MODULENAME, taskName, 'PING');
    res.status(404).send({ errCode: 1, errMsg: 'Resource not found' });
  });
}

/**
 * Initialize error route
 */
function initErrorRoute() {
  const taskName = 'errorroute';

  app.use((e, req, res, next) => {
    logger.logError(req.reqUniqueID, MODULENAME, taskName, e);
    res.status(500).send({ errCode: 2, errMsg: `Error: ${e.message}` });
  });
}

// init app
initApp();

/**
 * Exports
 */
module.exports = app;
