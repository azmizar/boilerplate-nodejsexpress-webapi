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

    this._appError = null;
  }

  /**
   * Gets/sets applcation error information
   * @param {ErrorMessageModel} appErrorInfo Application error message
   */
  appError(appErrorInfo) {
    if (typeof (appErrorInfo) !== 'undefined') {
      this._appError = appErrorInfo;
    }

    return this._appError;
  }
}

/**
 * Export
 */
module.exports = AppError;