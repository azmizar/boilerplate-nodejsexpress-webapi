/***************************************
 * Test script for server.js
 ***************************************/
const MODULENAME = 'TestServer';

/**
 * Startup script
 */
require('module-alias/register');
require('@root/config/paths-alias.config');

/**
 * 3rd party imports
 */
const _ = require('lodash');
const superagent = require('superagent');
const expect = require('expect.js');

/**
 * App imports
 */
const start = require('./server').start;
const shutdown = require('./server').shutdown;
const port = require('./server').port;
const logger = require('./config/winston.config');

describe('Run the server', () => { 
  before(() => { 
    try {
      // remove console log from logger
      let transport = _.find(logger.transports, (item, key, coll) => {
        return item.name === 'console';
      });

      logger.remove(transport);
    } catch (e) {
      console.log(`${ removeConsoleLog }: ${ e.message }`);
    }

    start();
  });

  describe('Check PING endpoint', () => { 
    it('should response with 200', (done) => { 
      superagent.get(`http://localhost:${ port() }/api/v1/ping`).end((error, response) => { 
        expect(response.status).to.equal(200);
        done();
      });
    });
  });  

  describe('Check non-existent endpoint', () => {
    it('should response with 404', (done) => {
      superagent.get(`http://localhost:${ port() }/api/v1/noping`).end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });
  });  

  after(() => { 
    shutdown();
  });
});