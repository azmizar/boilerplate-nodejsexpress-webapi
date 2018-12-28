/***************************************
 * Test script find service
 ***************************************/
const MODULENAME = 'TestFindService';

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
const FindSvc = require('../../common/find.service');

describe('Testing Find Service', () => { 

  let _items = [
    '/api/v1/mocks/',
    '/api/v1/ping',
    '/api/ping',
    '/api/ping/test',
    '/pong'
  ];

  it('should find item - exact match', (done) => { 
    let ind = FindSvc.existInList(_items, '/api/ping', true);

    expect(ind).to.be(2);
    done();
  });

  it('should find item - contains', (done) => {
    let ind = FindSvc.existInList(_items, '/api/v1/pong', false);

    expect(ind).to.be(4);
    done();
  });

  it('should not find item - exact match', (done) => {
    let ind = FindSvc.existInList(_items, '/api', true);

    expect(ind).to.be(-1);
    done();
  });

  it('should not find item - contains', (done) => {
    let ind = FindSvc.existInList(_items, 'mocha', false);

    expect(ind).to.be(-1);
    done();
  });
});