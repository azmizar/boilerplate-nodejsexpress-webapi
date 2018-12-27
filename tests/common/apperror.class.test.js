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
const AppError = require('../../common/apperror.class');

describe('Testing AppError class', () => {
  
  let _modName = 'MOCHATEST';
  let _taskName = 'it()';
  let _origMessage = 'This is mocha test';

  let _appErr = null;
  let _normalErr = null;

  before('Init AppError', () => { 
    _appErr = new AppError(_origMessage);
    _appErr.setModuleAndTask(_modName, _taskName);

    _normalErr = new Error(_origMessage);
    AppError.setModuleAndTaskForError(_normalErr, _modName, _taskName);
  });

  describe('AppError instance', () => { 
    it('should have original message', (done) => {
      expect(_appErr.message).to.be(_origMessage);
      done();
    });

    it('should have original module name', (done) => { 
      _appErr.setModuleAndTask('SECONDMOCHATEST', 'itAgain()');

      expect(_appErr.moduleName()).to.be(_modName);
      done();
    });

    it('should have original task name', (done) => {
      _appErr.setModuleAndTask('SECONDMOCHATEST', 'itAgain()');

      expect(_appErr.taskName()).to.be(_taskName);
      done();
    });
  });

  describe('Error instance', () => {
    it('should have original message', (done) => {
      expect(_normalErr.message).to.be(_origMessage);
      done();
    });

    it('should have original module name', (done) => {
      AppError.setModuleAndTaskForError(_normalErr, 'SECONDMOCHATEST', 'itAgain()');

      expect(_normalErr.moduleName()).to.be(_modName);
      done();
    });

    it('should have original task name', (done) => {
      AppError.setModuleAndTaskForError(_normalErr, 'SECONDMOCHATEST', 'itAgain()');

      expect(_normalErr.taskName()).to.be(_taskName);
      done();
    });
  });
});