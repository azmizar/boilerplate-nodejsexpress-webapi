'use strict';

const MODULENAME = 'StartupApp';

/**
 * 3rd party imports
 */
const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();

/**
 * Exports
 */
module.exports = app;
