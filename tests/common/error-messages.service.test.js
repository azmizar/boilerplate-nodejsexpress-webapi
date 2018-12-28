/***************************************
 * Test script error messages configurations
 ***************************************/
const MODULENAME = 'TestErrorMessagesService';

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
const CommonIDsSvc = require('../../common/ids.service');
const ErrMsgsSvc = require('../../common/error-messages.service');

describe('Testing ErrorMessagesService', () => { 
  
  let _errMsg = 'Mocha test';
  let _err = null;

  before('Init', () => { 
    _err = new Error(_errMsg);
  });

  describe('getErrorInformation()', () => { 
    it('should return error msg for error number 0', (done) => {
      let errInfo = ErrMsgsSvc.getErrorInformation(0, 'ALLGOOD', 'This is a dummy details');

      expect(errInfo.errorNumber).to.be(0);
      done();
    });

    it('should overwrite error msg for error number 0', (done) => {
      let errInfo = ErrMsgsSvc.getErrorInformation(0, 'ALLGOOD', 'This is a dummy details');

      expect(errInfo.errorMessage).to.be('ALLGOOD');
      done();
    });

    it('should not overwrite error msg for error number 2', (done) => {
      let errInfo = ErrMsgsSvc.getErrorInformation(2, 'ALLGOOD', 'This is a dummy details');

      expect(errInfo.errorMessage).not.to.be('ALLGOOD');
      done();
    });

    it('should return error info with error number 1 for non-existent error number', (done) => {
      let errInfo = ErrMsgsSvc.getErrorInformation(-1, 'ALLGOOD', 'This is a dummy details');

      expect(errInfo.errorNumber).to.be(1);
      done();
    });
  });

  describe('getErrorInformationFromError()', () => { 
    it('should return error msg for error number 0', (done) => {
      let errInfo = ErrMsgsSvc.getErrorInformationFromError(0, _err);

      expect(errInfo.errorNumber).to.be(0);
      done();
    });

    it('should overwrite error msg for error number 0', (done) => {
      let errInfo = ErrMsgsSvc.getErrorInformationFromError(0, _err);

      expect(errInfo.errorMessage).to.be(_errMsg);
      done();
    });

    it('should not overwrite error msg for error number 2', (done) => {
      let errInfo = ErrMsgsSvc.getErrorInformationFromError(2, _err);

      expect(errInfo.errorMessage).not.to.be(_errMsg);
      done();
    });

    it('should return error info with error number 1 for non-existent error number', (done) => {
      let errInfo = ErrMsgsSvc.getErrorInformationFromError(-1, _err);

      expect(errInfo.errorNumber).to.be(1);
      done();
    });
  });
});