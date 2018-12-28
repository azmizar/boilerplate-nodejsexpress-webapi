'use strict';

/***************************************
 * Utilies related to error messages
 ***************************************/
const MODULENAME = 'CommonErrorMessageService';

/**
 * Startup script
 */
require('module-alias/register');
require('@root/config/paths-alias.config');

/**
 * Node imports
 */
const fs = require('fs');

/**
 * 3rd party imports
 */
const _ = require('lodash');

/**
 * App imports
 */
const ErrorFiles = require('@root/config/error-messsages.config');
const ErrorMessageModel = require('@root/common-models/error-message.model');
const AppError = require('./apperror.class');

/**
 * App imports
 */
const logger = require('@root/config/winston.config');

/**
 * Internal variables
 */
let _errorMessages = [];

/**
 * Loads errors into one array
 */
function loadErrors() {
  const taskName = 'loadErrors()';

  try {
    // loop through error files
    _.forEach(ErrorFiles, (item, index, coll) => { 
      logger.logDebug(process.env.SERVERUNIQUEID, MODULENAME, taskName, `Loading error messages ${ item.file }`);

      // parse JSON - in array
      let errMsgs = JSON.parse(fs.readFileSync(item.file));

      _.forEach(errMsgs, (msg, msgInd, msgs) => { 
        let errMsg = new ErrorMessageModel(msg);
        _errorMessages.push(errMsg);
      });

      // sort by error number
      _errorMessages = _.sortBy(_errorMessages, ['errorNumber', 'category', 'subCategory']);
    });

    logger.logInfo(process.env.SERVERUNIQUEID, MODULENAME, taskName, `Loaded ${ _errorMessages.length } error messages`);
  } catch (e) {
    AppError.setModuleAndTaskForError(e, MODULENAME, taskName);
    
    logger.logError(process.env.SERVERUNIQUEID, MODULENAME, taskName, e);
    logger.logInfo(process.env.SERVERUNIQUEID, MODULENAME, taskName, 'Exiting server due to error in loading error messages');

    process.exit(1);
  }
}

// load errors
loadErrors();

/**
 * Gets error information based on error number
 * @param {Number} errNum Error number
 * @param {String} errMsg Error message
 * @param {String} errDetails ErrorDetails
 */
function getErrorInformation(errNum, errMsg, errDetails) {
  const taskName = 'getErrorInformation()';

  try {
    // find errInfo based on error number
    let newErrInfo = null;
    let errInfo = _.find(_errorMessages, { "errorNumber": errNum });
        
    if (errInfo) {
      // found it - check if we can override message
      newErrInfo = errInfo.clone();

      if (errInfo.canOverrideMessage) {
        if (errMsg) {
          newErrInfo.errorMessage = errMsg;
        }

        if (errDetails) {
          newErrInfo.errorDetails = errDetails;
        }
      }
    } else {
      // not found - return errorNumber = 1 which is reserved for error number not found
      newErrInfo = getErrorInformation(1, `Error number ${ errNum } is not found`, null);

      // to avoid infinite loop - check if the errNum = 1 - then just throw an exception with default information
      if ((!newErrInfo) && (errNum === 1)) {
        let newErr = new AppError(`Error number ${ errNum } is not found`);

        newErr.appError(new ErrorMessageModel({
          "errorNumber": 1,
          "errorMessage": `Error number ${ errNum } is not found`,
          "errorDetails": "Reserved error number 1 does not exist",
          "category": "GENERAL",
          "subcategory": "RESERVED",
          "errorLevel": "ERROR",
          "canOverrideMessage": true
        }));

        newErr.setModuleAndTask(MODULENAME, taskName);

        throw newErr;
      }
    }

    // return only if errNum exists in our collection
    return newErrInfo;
  } catch (e) {
    AppError.setModuleAndTaskForError(e, MODULENAME, taskName);
    throw e;
  }
}

/**
 * Get error information based on error number and Error object
 * @param {Number} errNum Error number
 * @param {Error} err Error object (error message and stack trace will be used as message and details respectively)
 */
function getErrorInformationFromError(errNum, err) {
  return getErrorInformation(errNum, err.message, err.stack);
}

/**
 * Service definition
 */
const ErrorMessagesService = {
  "getErrorInformation": getErrorInformation,
  "getErrorInformationFromError": getErrorInformationFromError
};

/**
 * Export
 */
module.exports = ErrorMessagesService;