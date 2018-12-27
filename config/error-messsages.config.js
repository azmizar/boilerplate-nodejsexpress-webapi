'use strict';

/***************************************
 * Error messages configuration
 ***************************************/
const MODULENAME = 'ConfigErrorMessages';

/**
 * Startup script
 */
require('module-alias/register');
require('@root/config/paths-alias.config');

/**
 * 3rd party imports
 */
const pathAlias = require('path-alias');

/**
 * Files to load error messages from
 */
const ErrorConfigurations = [
  { "file": pathAlias.resolve('common-error-messages/general.error.messages.json'), "description": 'General error messages' },
  { "file": pathAlias.resolve('common-error-messages/express.error.messages.json'), "description": 'Express related error messages' }
];

/**
 * Export
 */
module.exports = ErrorConfigurations;


