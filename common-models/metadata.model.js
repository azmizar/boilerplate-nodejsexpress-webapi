'use strict';

/***************************************
 * API metadata class
 ***************************************/
const MODULENAME = 'CommonMetaDataModel';

/**
 * 3rd party imports
 */
const _ = require('lodash');
const moment = require('moment');
const SchemaObject = require('schema-object');

/**
 * App imports
 */
const TaskModel = require('./task.model');

/**
 * Add task into metadata.
 * @param {TaskModel} task Task to add to this reponse can be TaskModel or JSON
 */
function addTask(task) {
  this.addTasks([task]);
}

/**
 * Add tasks into metadata.
 * @param {TaskModel[]} tasks Tasks to add to this reponse can be TaskModel or JSON
 */
function addTasks(tasks) {
  tasks = tasks || [];

  if (tasks && tasks.length > 0) {
    _.forEach(tasks, (value, index, coll) => {
      if (value instanceof TaskModel) {
        this.tasks.push(value);
      } else {
        this.tasks.push(new TaskModel(value));
      }
    });
  }
}

/**
 * End metadata
 * @param {TaskModel} task Task to add (if any) can either be singular TaskModel, TaskModel array, or JSON
 */
function endMetaData(task) {
  // handle task first
  if (task) {
    if (task instanceof Array) {
      this.addTasks(task);
    } else {
      this.addTask(task);
    }
  }

  // calculate elapsed
  this.totalElapsedInMS = moment().diff(moment(this.requestTS));
}

/**
 * API Response metadata clas
 */
const APIResponseMetaDataModel = new SchemaObject(
  {
    serverName: String,
    requestURL: String,
    requestTS: { type: String, default: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ') },
    requestUUID: String,
    apiBuildVersion: String,
    totalElapsedInMS: Number,
    tasks: [TaskModel]
  },
  {
    preserveNull: true,
    strict: true,
    keysIgnoreCase: true,
    methods: {
      addTask: addTask,
      addTasks: addTasks,
      endMetaData: endMetaData
    }
  }
);

/**
 * Export
 */
module.exports = APIResponseMetaDataModel;
