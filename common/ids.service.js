'use script';

/***************************************
 * Shared service for IDs
 ***************************************/
const MODULENAME = 'CommonIDsService';

/**
 * 3rd party imports
 */
const UUIDV4 = require('uuid/v4');

/**
 * Generates UUID (v4)
 */
function generateUUID() {
  return UUIDV4();
}

/**
 * Service definitions
 */
const CommonIDsService = {
  generateUUID: generateUUID
};

/**
 * Export
 */
module.exports = CommonIDsService;
