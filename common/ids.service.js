'use script';

/***************************************
 * Shared service for IDs
 ***************************************/
const MODULENAME = 'CommonIDsService';

/**
 * NodeJS imports
 */
const os = require('os');
const crypto = require('crypto');

/**
 * 3rd party imports
 */
const uuidv4 = require('uuid/v4');

/**
 * App imports
 */
const logger = require('../config/winston.config');

/**
 * Internal variables
 */
let _serverName = null;
let _serverNameHash = null;

/**
 * Generates UUID (v4)
 */
function generateUUID() {
  return uuidv4();
}

/**
 * Initializes certain values so that we don't have to repeat it
 */
function init() {
  const taskName = 'init()';

  try {
    // get server name and hash it as well
    _serverName = os.hostname();

    const hash = crypto.createHash('sha256');
    hash.update(os.hostname());
    _serverNameHash = hash.digest('base64');
  } catch (e) {
    logger.logError(process.env.SERVERUNIQUEID, MODULENAME, taskName, e);
  }
}

// initialize this script
init();

/**
 * Service definitions
 */
const CommonIDsService = {
  generateUUID: generateUUID,
  serverName: _serverName,
  serverNameHash: _serverNameHash
};

/**
 * Export
 */
module.exports = CommonIDsService;
