/***************************************
 * Test script Winston logger
 ***************************************/
const MODULENAME = 'TestWinstonLogger';

/**
 * Startup script
 */
require('module-alias/register');
require('@root/config/paths-alias.config');

// exception for pathAlias since we need it to reolve config
const pathAlias = require('path-alias');
require('dotenv').config({ path: pathAlias.resolve('config/.env') });

/**
 * NodeJS import
 */
const fs = require('fs');
const path = require('path');

/**
 * 3rd party import
 */
const expect = require('expect.js');
const rll = require('read-last-line');
const winston = require('winston');

/**
 * App import
 */
const CommonIDSvc = require('../../common/ids.service');
const logger = require('../../config/winston.config');

describe('Testing LOGGER', () => { 

  let _logPath = null;
  let _logDir = null;

  before('initialize internal variables', () => { 
    // get the all log file full path
    _logPath = pathAlias.resolve(process.env.ALLLOGFILE);

    // get the directory
    _logDir = path.dirname(_logPath);
  });

  it('should have created logs folder', (done) => {
    // get stat on director
    let logDirStat = fs.statSync(_logDir);

    // test it
    expect(logDirStat.isDirectory()).to.be(true);
    done();
  });

  it('should have created log file', (done) => { 
    // get stat on the file
    let logPathStat = fs.statSync(_logPath);

    // test it
    expect(logPathStat.isFile()).to.be(true);
    done();
  });
});