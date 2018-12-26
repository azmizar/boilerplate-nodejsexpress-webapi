'use strict';

/***************************************
 * Utilies related to error messages
 ***************************************/
const MODULENAME = 'CommonErrorMessageService';

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
const ErrorFiles = require('../config/error-messsages.config');
const ErrorMessageModel = require('../common-models/error-message.model');
const AppError = require('./apperror.class');

/**
 * App imports
 */
const logger = require('../config/winston.config');

/**
 * Internal variables
 */
const _errorMessages = [];

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
    logger.logError(process.env.SERVERUNIQUEID, MODULENAME, taskName, e);
    logger.logInfo(process.env.SERVERUNIQUEID, MODULENAME, taskName, 'Exiting server due to error in loading error messages');

    process.exit(1);
  }
}

// load errors
loadErrors();


function getErrorInformation(errNum, errMsg, errDetails) {
  try {
    // find errInfo based on error number
    let newErr = null;
    let errInfo = _.find(_errorMessages, { "errorNumber": errNum });
        
    if (errInfo) {
      // found it - check if we can override message
      newErr = errInfo.clone();

      if (errInfo.canOverrideMessage) {
        if (errMsg) {
          newErr.errorMessage = errMsg;
        }

        if (errDetails) {
          newErr.errorDetails = errDetails;
        }
      }
    } else {
      // not found - return errorNumber = 1 which is reserved for error number not found
      newErr = getErrorInformation(1, `Error number ${ errNum } is not found`, null);

      // to avoid infinite loop - check if the errNum = 1 - then just throw an exception with default information
      if ((!newErr) && (errNum === 1)) {
        newErr = new AppError(`Error number ${ errNum } is not found`);
        newErr.appError(new ErrorMessageModel({
          "errorNumber": 1,
          "errorMessage": "Error number not found",
          "errorDetails": "Reserved error number 1 does not exist",
          "category": "GENERAL",
          "subcategory": "RESERVED",
          "errorLevel": "ERROR",
          "canOverrideMessage": true
        }));

        throw newErr;
      }
    }

    // return only if errNum exists in our collection
    return newErr;
  } catch (e) {
    if (!(e instanceof AppError)) {

    }
    
    throw e;
  }
}

function getErrorInformationFromError(errNum, err) {}

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