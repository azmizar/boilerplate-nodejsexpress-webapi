'use strict';

/***************************************
 * Default middleware
 ***************************************/
const MODULENAME = 'DefaultMiddleware';

/**
 * App imports
 */
const CommonIDsSvc = require('../common/ids.service');
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

    // pass to next
    next();
  } catch (e) {
    logger.logError(req.reqUniqueID, MODULENAME, taskName, e);
    next(e);
  }
};
