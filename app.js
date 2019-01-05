'use strict';

const express = require('express');
const bodyParser = require('body-parser')

const app = express();

// Load files of Routes


// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS


// Routes
app.get('/', (req, res) => {
    res.status(200).send(
        "<h1>index.js</h1>"
    );
});

// export
module.exports = app;