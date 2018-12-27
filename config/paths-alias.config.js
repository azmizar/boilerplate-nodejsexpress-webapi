'use strict';

/***************************************
 * Error messages configuration
 ***************************************/
const MODULENAME = 'ConfigPathsAlias';

/**
 * 3rd party imports
 */
const pathAlias = require('path-alias');

/**
 * Sets aliases
 */
function setAliases() {
  const taskName = 'setAliases()';

  try {

  } catch (e) {
    console.log(`[${ MODULENAME }:${ taskName }] Unable to set path aliases ${ e.message }`);
    console.log(`[${ MODULENAME }:${ taskName }] Exiting server due to error`);

    process.exit(1);
  }
}

// set aliases
setAliases();