/***************************************
 * Test script error messages configurations
 ***************************************/
const MODULENAME = 'TestErrorMessagesConfig';

/**
 * Startup script
 */
require('module-alias/register');
require('@root/config/paths-alias.config');

// exception for pathAlias since we need it to reolve config
const pathAlias = require('path-alias');
require('dotenv').config({ path: pathAlias.resolve('config/.env') });

/**
 * 3rd party imports
 */
const expect = require('expect.js');

/**
 * App imports
 */
const errMsgsCfg = require('../../config/error-messsages.config');

describe('Testing error messages config', () => { 
  it('should have more than 1 items', (done) => { 
    expect(errMsgsCfg.length).to.be.greaterThan(0);
    done();
  });
});