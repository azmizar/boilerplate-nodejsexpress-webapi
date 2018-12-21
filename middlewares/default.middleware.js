'use strict';

/***************************************
 * Default middleware
 ***************************************/
const MODULENAME = 'DefaultMiddleware';

/**
 * 3rd Party imports
 */
const moment = require('moment');

/**
 * App imports
 */
const CommonIDsSvc = require('../common/ids.service');
const APIResponseMetaDataSchema = require('../common-schemas/metadata.schema');
const logger = require('../config/winston.config');

/**
 *
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
    const meta = new APIResponseMetaDataSchema();

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
    logger.logError(req.reqUniqueID, MODULENAME, taskName, e);
    next(e);
  }
};
