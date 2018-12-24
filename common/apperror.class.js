'use strict';

/***************************************
 * AppError class
 ***************************************/
const MODULENAME = 'CommonAppErrorClass';

/**
 * Extends Error for application specific Error
 */
class AppError extends Error {

  /**
   * Default constructor
   * @param  {...any} args Error arguments
   */
  constructor (...args) {
    super(...args);
    Error.captureStackTrace(this, AppError);
  }
}

/**
 * Export
 */
module.exports = AppError;