'use strict';

/***************************************
 * Error message class
 ***************************************/
const MODULENAME = 'CommonErrorMessageModel';

/**
 * 3rd party imports
 */
const _ = require('lodash');
const moment = require('moment');
const SchemaObject = require('schema-object');

/**
 * ErrorMessage Class
 */
const ErrorMessageModel = new SchemaObject(
  {
    errorNumber: Number,
    errorMessage: String,
    errorDetails: String,
    errorLevel: { type: String, enum: ['INFO', 'WARNING', 'ERROR', 'CRITICALERROR'], default: 'ERROR' },
    category: String,
    subCategory: String,
    canOverrideMessage: Boolean
  },
  {
    preserveNull: true,
    strict: true,
    keysIgnoreCase: true
  }
);

/**
 * Export
 */
module.exports = ErrorMessageModel;
