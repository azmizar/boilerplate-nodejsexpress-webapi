'use strict';

/***************************************
 * App startup script
 ***************************************/
const MODULENAME = 'StartupApp';

/**
 * Startup script
 */
require('module-alias/register');
require('@root/config/paths-alias.config');

/**
 * 3rd party imports
 */
const pathAlias = require('path-alias');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

/**
 * App imports
 * Note: ./common/ids.service MUST be the first script to be loaded for App because it contains IDs that are used by ALL other modules
 */
const CommonIDsSvc = require('@root/common/ids.service'); 
const ErrorMsgsSvc = require('@root/common/error-messages.service');

const logger = require('@root/config/winston.config');

const APIResponseModel = require('@root/common-models/response.model');
const TaskModel = require('@root/common-models/task.model');

const AppError = require('./common/apperror.class');

/**
 * Internal variables
 */
let _serverUniqueID = null;
const _apiRouter = express.Router();

/**
 * Initialize app
 */
function initApp() {
  const taskName = 'initApp()';

  try {
    // create server/instance unique ID
    _serverUniqueID = process.env.SERVERUNIQUEID;

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
    app.use(require('./middlewares/default.middleware'));

    // root route
    let apiRoot = process.env.APIROOT || '';
    let apiVersion = process.env.APIVERSION || 'v1';

    let baseRoute = `/${apiRoot !== '' ? apiRoot + '/' : ''}${apiVersion !== '' ? apiVersion : ''}/`;
    logger.logInfo(_serverUniqueID, MODULENAME, taskName, `Base route: ${baseRoute}`);

    app.use(baseRoute, _apiRouter);

    initPing();
    initCatchAllRoute();
    initErrorRoute();
  } catch (e) {
    AppError.setModuleAndTaskForError(e, MODULENAME, taskName);
    
    logger.logError(_serverUniqueID, MODULENAME, taskName, e);
    logger.logInfo(_serverUniqueID, MODULENAME, taskName, 'Exiting server due to error during initializing app');

    process.exit(1);
  }
}

/**
 * Initialize default PING
 */
function initPing() {
  // default ping
  _apiRouter.get('/ping', (req, res) => {
    const taskName = '/ping';

    const resp = new APIResponseModel();
    const task = TaskModel.createTask(MODULENAME, taskName, null);

    resp.setMetaData(req.responseMetaData);

    task.endTask('Health checks');

    resp.endResponse(0, 'Health checks passed', null, task);

    logger.logDebug(req.reqUniqueID, MODULENAME, taskName, 'Health checks');
    res.status(200).send(resp.toObject());
  });
}

/**
 * Initialize catch all route (undefined routes)
 */
function initCatchAllRoute() {
  app.all('*', (req, res) => {
    const taskName = 'undefinedroute';

    const resp = new APIResponseModel();

    resp.setMetaData(req.responseMetaData);
    resp.endResponse(1, 'Route does not exist', null, null);

    logger.logDebug(req.reqUniqueID, MODULENAME, taskName, 'Route does not exist');
    res.status(404).send(resp.toObject());
  });
}

/**
 * Initialize error route
 */
function initErrorRoute() {
  app.use((e, req, res, next) => {
    const taskName = 'errorroute';

    const resp = new APIResponseModel();

    resp.setMetaData(req.responseMetaData);
    resp.endResponse(1, 'Unexpected exception', e, null);

    logger.logError(req.reqUniqueID, MODULENAME, taskName, e);
    res.status(500).send(resp.toObject());
  });
}

// init app
initApp();

/**
 * Exports
 */
module.exports = app;
