'use strict';

/***************************************
 * Example on how to handle exception
 ***************************************/
const MODULENAME = 'ExampleErrorHandling';

/**
 * Load .env
 */
require('dotenv').config({ path: './config/.env' });

/**
 * App imports
 */
const CommonIDsSvc = require('../common/ids.service'); 
const AppError = require('../common/apperror.class');
const ErrorMessageSvc = require('../common/error-messages.service');

/**
 * Function A
 * @param {Boolean} useAppError True to trigger AppError, False to trigger normal Error
 */
function fnA(useAppError) {
  const taskName = 'fnA';

  try {
    fnB(useAppError);
  } catch (e) {
    AppError.setModuleAndTaskForError(e, MODULENAME, taskName);
    throw e;
  }
}

/**
 * Function B
 * @param {Boolean} useAppError True to trigger AppError, False to trigger normal Error
 */
function fnB(useAppError) {
  const taskName = 'fnB';

  try {
    fnC(useAppError);
  } catch (e) {
    AppError.setModuleAndTaskForError(e, MODULENAME, taskName);
    throw e;
  }
}

/**
 * Function C
 * @param {Boolean} useAppError True to trigger AppError, False to trigger normal Error
 */
function fnC(useAppError) {
  const taskName = 'fnC';

  try { 
    if (useAppError) {
      createAppError();
    } else {
      createError();
    }
  } catch (e) {
    AppError.setModuleAndTaskForError(e, MODULENAME, taskName);
    throw e;
  }
}

/**
 * Create and throw AppError
 */
function createAppError() {
  const taskName = 'createAppError()';

  try { 
    let newError = new AppError('Triggering AppError');
    newError.setModuleAndTask(MODULENAME, taskName);
    
    let errInfo = ErrorMessageSvc.getErrorInformation(100, newError);
    newError.appError(errInfo);

    throw newError;
  } catch (e) {
    AppError.setModuleAndTaskForError(e, MODULENAME, taskName);
    throw e;
  }
}

/**
 * Create and throw Error
 */
function createError() {
  const taskName = 'createError()';

  try {
    throw new Error('Triggering Error');
  } catch (e) {
    AppError.setModuleAndTaskForError(e, MODULENAME, taskName);
    throw e;
  }
}

/**
 * Triggers AppError
 */
function triggerAppError() {
  const taskName = 'triggerAppError()';

  try {
    fnA(true);
  } catch (e) {
    console.log(`Module:\t ${ e.moduleName() }`);
    console.log(`Task:\t ${ e.taskName() }`);

    if (e instanceof AppError) {
      console.log(`ErrInfo:\t ${ JSON.stringify(e.appError().toObject()) }`);
    }

    console.log(`Message: ${ e.message }`);
    console.log(`Stack:\t ${ e.stack }`);
  }
}

/**
 * Triggers normal error
 */
function triggerError() {
  const taskName = 'triggerError()';

  try {
    fnA(false);
  } catch (e) {
    console.log(`Module:\t ${ e.moduleName() }`);
    console.log(`Task:\t ${ e.taskName() }`);
    console.log(`Message: ${ e.message }`);
    console.log(`Stack:\t ${ e.stack }`);
  }
}

// test
triggerAppError();
triggerError();