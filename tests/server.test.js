const startServer = require('../server').startServer;
const shutdown = require('../server').shutdown;
const port = require('../server').port;

const superagent = require('superagent');
const expect = require('expect.js');

describe('server', () => { 
  before(() => { 
    startServer();
  });

  describe('homepage', () => { 
    it('should response to PING', (done) => { 
      superagent.get(`http://localhost:${ port }/api/v1/ping`).end((error, response) => { 
        expect(response.status).to.equal(200);
        done();
      });
    });
  });  

  after(() => { 
    shutdown();
  });
});