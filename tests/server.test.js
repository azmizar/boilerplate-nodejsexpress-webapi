/**
 * Startup script
 */
require('module-alias/register');
require('@root/config/paths-alias.config');

const start = require('@root/server').start;
const shutdown = require('@root/server').shutdown;
const port = require('@root/server').port;

const superagent = require('superagent');
const expect = require('expect.js');

describe('server', () => { 
  before(() => { 
    start();
  });

  describe('homepage', () => { 
    it('should response to PING', (done) => { 
      superagent.get(`http://localhost:${ port() }/api/v1/ping`).end((error, response) => { 
        if (error) {
          done(error);
        } else {
          expect(response.status).to.equal(200);
          done();
        }
      });
    });
  });  

  after(() => { 
    shutdown();
  });
});