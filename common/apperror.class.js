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
    this._moduleName = null;
    this._taskName = null;
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

  /**
   * Gets/sets module that created this error (can only be set once)
   * @param {String} moduleName Module name
   */
  moduleName(moduleName) {
    if (typeof (moduleName) !== 'undefined') {
      if (!this._moduleName) {
        this._moduleName = moduleName;
      }
    }

    return this._moduleName;
  }

  /**
   * Gets/sets task that created this error (can only be set once)
   * @param {String} taskName Task name
   */
  taskName(taskName) {
    if (typeof (taskName) !== 'undefined') {
      if (!this._taskName) { 
        this._taskName = taskName;
      }
    }

    return this._taskName;
  }

  /**
   * Sets the module and task that created this error
   * @param {String} moduleName Module name
   * @param {String} taskName Task name
   */
  setModuleAndTask(moduleName, taskName) {
    this.moduleName(moduleName);
    this.taskName(taskName);
  }

  /**
   * Adds module and task to the error object
   * @param {Error} err Error object
   * @param {String} moduleName Module name
   * @param {String} taskName Task name
   */
  static setModuleAndTaskForError(err, moduleName, taskName) {
    if (err) {
      if (err instanceof AppError) {
        // app error has its own
        err.setModuleAndTask(moduleName, taskName);
      } else {
        // other Error object - check if properties have been set and only set if not yet set
        if (!err.moduleName) {
          err.moduleName = function (moduleName) { 
            if (typeof (moduleName) !== 'undefined') {
              if (!this._moduleName) {
                this._moduleName = moduleName;
              }
            }

            return this._moduleName;
          };

          err.moduleName(moduleName);
        }

        if (!err.taskName) {
          err.taskName = function (taskName) { 
            if (typeof (taskName) !== 'undefined') {
              if (!this._taskName) {
                this._taskName = taskName;
              }
            }

            return this._taskName;
          };

          err.taskName(taskName);
        }
      }
    }
  }
}

/**
 * Export
 */
module.exports = AppError;