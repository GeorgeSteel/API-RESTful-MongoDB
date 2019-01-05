'use strict';

const express = require('express');
const bodyParser = require('body-parser')

const app = express();

// Load files of Routes
var project_routes = require('./routes/project');

// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS


// Routes
app.use('/api', project_routes);

// export
module.exports = app;