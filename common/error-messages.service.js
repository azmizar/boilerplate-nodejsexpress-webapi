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
        _errorMessages.push(errMsg.toObject());
      });
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

function getErrorInformation(errCode, errMsg, errDesc) {}

function getErrorInformationFromError(errCode, err) {}

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