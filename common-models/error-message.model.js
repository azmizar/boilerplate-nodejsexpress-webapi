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
const ErrorMessageModel = new SchemaObject({}, {});

/**
 * Export
 */
module.exports = ErrorMessageModel;
