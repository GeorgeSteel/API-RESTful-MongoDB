'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio', { useNewUrlParser: true })
        .then(() =>{
            console.log('DB Connected!!');            
            // Creation of server
            app.listen(port, () => {
                console.log('server running in port: ' + port);
            })
        })
        .catch(err => {
            console.error(err);            
        })