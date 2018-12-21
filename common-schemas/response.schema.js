'use strict';

/***************************************
 * API response base class
 ***************************************/
const MODULENAME = 'CommonSchemaResponse';

/**
 * 3rd party imports
 */
const SchemaObject = require('schema-object');

/**
 * App imports
 */
const APIResponseMetaDataSchema = require('./metadata.schema');

/**
 * Sets the metadata object
 * @param {*} meta APIResponseMetaDataSchema object
 */
function setMetaData(meta) {
  this.metadata = meta;
}

/**
 * Ends response
 * @param {Number} respCode Reponse code
 * @param {String} respMsg Response message
 * @param {Object} respDetails Response details (can be Error object or String)
 * @param {TaskSchema} task Task to add (if any) can either be singular TaskSchema, TaskSchema array, or JSON
 */
function endResponse(respCode, respMsg, respDetails, task) {
  // end metadata - since we're ending response
  if (this.metadata) {
    this.metadata.endMetaData(task);
  }

  // error information
  this.respCode = respCode;
  this.respMessage = respMsg;

  if (respDetails && respDetails instanceof Error) {
    // since this is Error object - only set the stack as details if this is in development mode
    if (process.env.NODE_ENV === 'development') {
      this.respDetails = respDetails.stack;
    }
  } else {
    // assume this is a string - so set
    this.respDetails = respDetails;
  }
}

/**
 * API Response base class
 */
const APIResponseSchema = new SchemaObject(
  {
    metadata: APIResponseMetaDataSchema,
    respCode: String,
    respMessage: String,
    respDetails: String
  },
  {
    preserveNull: true,
    strict: false,
    keysIgnoreCase: true,
    methods: {
      setMetaData: setMetaData,
      endResponse: endResponse
    }
  }
);

/**
 * Export
 */
module.exports = APIResponseSchema;
