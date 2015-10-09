var express = require('express');
var bodyParser = require('body-parser');
var notes = require('./routes/notes'); //routes are defined here
var app = express(); //Create the Express app

app.use(bodyParser.json());//configure body-parser
app.use(bodyParser.urlencoded());
app.use('/v1', notes); //This is our route middleware

module.exports = app;