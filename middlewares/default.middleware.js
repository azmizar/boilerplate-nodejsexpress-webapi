'use strict';

/***************************************
 * Default middleware
 ***************************************/
const MODULENAME = 'DefaultMiddleware';

/**
 * Startup script
 */
require('module-alias/register');
require('@root/config/paths-alias.config');

/**
 * 3rd Party imports
 */
const moment = require('moment');

/**
 * App imports
 */
const CommonIDsSvc = require('@root/common/ids.service');

const logger = require('@root/config/winston.config');

const APIResponseMetaDataModel = require('@root/common-models/metadata.model');

const AppError = require('../common/apperror.class');

/**
 * HTTP middleware to handle initializing request execution
 * @param {*} req Express HTTP request object
 * @param {*} res Express HTTP response object
 * @param {*} next Express HTTP pipeline function
 */
module.exports = function(req, res, next) {
  const taskName = 'Middleware';

  try {
    // assign a unique id to this request and response
    const callGUID = CommonIDsSvc.generateUUID();

    req.reqUniqueID = callGUID;
    res.locals.reqUniqueID = callGUID;

    logger.logDebug(callGUID, MODULENAME, taskName, req.path);

    // response metadata schema
    const meta = new APIResponseMetaDataModel();

    meta.requestUUID = callGUID;
    meta.serverName = process.env.NODE_ENV === 'development' ? CommonIDsSvc.serverName : CommonIDsSvc.serverNameHash;
    meta.requestURL = req.originalUrl;
    meta.apiBuildVersion = process.env.npm_package_version || '--NOT AVAILABLE--';
    meta.requestTS = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    meta.totalElapsedInMS = -1;

    // set metadata to req and res
    req.responseMetaData = meta;
    res.locals.responseMetaData = meta;

    // pass to next
    next();
  } catch (e) {
    AppError.setModuleAndTaskForError(e, MODULENAME, taskName);
    
    logger.logError(req.reqUniqueID, MODULENAME, taskName, e);
    next(e);
  }
};
