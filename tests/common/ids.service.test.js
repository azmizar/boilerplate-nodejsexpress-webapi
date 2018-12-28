/***************************************
 * Test script IDs service
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
 * NodeJS imports
 */
const os = require('os');
const crypto = require('crypto');

/**
 * 3rd party imports
 */
const expect = require('expect.js');

/**
 * App imports
 */
const CommonIDsSvc = require('../../common/ids.service');

describe('Test Common IDs Service', () => { 
  it('should generates unique UUID', (done) => { 
    let id1 = CommonIDsSvc.generateUUID();
    let id2 = CommonIDsSvc.generateUUID();

    expect(id1).not.equal(id2);
    done();
  });

  it('should returns machine name', (done) => { 
    expect(os.hostname()).equal(CommonIDsSvc.serverName);
    done();
  });

  it('should returns hashed machine name', (done) => { 
    const hash = crypto.createHash('sha256');
    hash.update(os.hostname());

    let hashedName = hash.digest('base64');

    expect(hashedName).equal(CommonIDsSvc.serverNameHash);
    done();
  });

  it('should returns instance UUID', (done) => {
    expect(process.env.SERVERUNIQUEID).equal(CommonIDsSvc.instanceUUID);
    done();
  });
});
