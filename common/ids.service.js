'use script';

/***************************************
 * Shared service for IDs
 ***************************************/
const MODULENAME = 'CommonIDsService';

/**
 * Startup script
 */
require('module-alias/register');
require('@root/config/paths-alias.config');

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
const logger = require('@root/config/winston.config');

/**
 * Internal variables
 */
let _serverName = null;
let _serverNameHash = null;
let _instanceUUID = null;

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
    // instance UUID
    _instanceUUID = generateUUID();
    process.env.SERVERUNIQUEID = _instanceUUID;

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
  serverNameHash: _serverNameHash,
  instanceUUID: _instanceUUID
};

/**
 * Export
 */
module.exports = CommonIDsService;
