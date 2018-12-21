'use strict';

/***************************************
 * Task class
 ***************************************/
const MODULENAME = 'CommonSchemaTask';

/**
 * 3rd party imports
 */
const _ = require('lodash');
const moment = require('moment');
const SchemaObject = require('schema-object');

/**
 * Creates a new task
 * @param {String} moduleName Module name
 * @param {String} taskName Task name
 * @param {String} taskDesc Task description (use taskName if null)
 */
function createTask(moduleName, taskName, taskDesc) {
  this.taskName = `${moduleName}:${taskName}`;
  this.taskDescription = taskDesc ? taskDesc : taskName;
  this.requestTS = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
}

/**
 * Add task into metadata.
 * @param {TaskSchema} task Task to add to this reponse can be TaskSchema or JSON
 */
function addTask(task) {
  this.addTasks([task]);
}

/**
 * Add tasks into metadata.
 * @param {TaskSchema[]} tasks Tasks to add to this reponse can be TaskSchema or JSON
 */
function addTasks(tasks) {
  tasks = tasks || [];

  if (tasks && tasks.length > 0) {
    _.forEach(tasks, (value, index, coll) => {
      if (value instanceof TaskSchema) {
        this.tasks.push(value);
      } else {
        this.tasks.push(new TaskSchema(value));
      }
    });
  }
}

/**
 * End task
 * @param {String} msg Message
 * @param {Error} err Error object
 */
function endTask(msg, err) {
  // set error or not
  if (err) {
    this.hasError = true;
  } else {
    this.hasError = false;
  }

  // set message
  this.taskMessage = msg ? msg : err ? err.message : '--NONE SPECIFIED--';

  // set elapsed
  this.elapsedInMS = moment().diff(moment(this.requestTS));
}

/**
 * Task schema
 */
const TaskSchema = new SchemaObject(
  {
    taskName: String,
    taskDescription: String,
    requestTS: { type: String, default: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ') },
    elapsedInMS: Number,
    hasError: Boolean,
    taskMessage: String,
    tasks: [Object]
  },
  {
    preserveNull: true,
    strict: true,
    keysIgnoreCase: true,
    constructors: {
      createTask: createTask
    },
    methods: {
      addTask: addTask,
      addTasks: addTasks,
      endTask: endTask
    }
  }
);

/**
 * Export
 */
module.exports = TaskSchema;
