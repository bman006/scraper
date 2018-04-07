var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const cheerio = require('cheerio');
var request = require('request');
const mongoose = require('mongoose');

// Require models for database
var db = require("./models");

// Setup express
var app = express();
var PORT = process.env.PORT || 3000;

// Create static directory for public files
app.use(express.static("public"));


// Connect to Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/scraperdb';
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});


// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Require routes
require('./routes')(app, db);

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});