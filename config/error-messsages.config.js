'use strict';

/***************************************
 * Error messages configuration
 ***************************************/
const MODULENAME = 'ConfigErrorMessages';

/**
 * Files to load error messages from
 */
const ErrorConfigurations = [
  { "file": './common-error-messages/general.error.messages.json', "description": 'General error messages' },
  { "file": './common-error-messages/express.error.messages.json', "description": 'Express related error messages' }
];

/**
 * Export
 */
module.exports = ErrorConfigurations;


