var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
var request = require('request');

// Require models for database
var db = require("./models");

// Require routes
var router = require("./routes");

// Setup express
var app = express();
var PORT = process.env.PORT || 3000;

// Connect to Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/scraperdb'
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});

// Create static directory for public files
app.use(express.static("public"));

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Web page to scrape data from
var pageToScrape = 'https://www.allmusic.com/';
// Variable to store page html in
var html = "";

// Get html
request(pageToScrape, function (error, response, body) {
    console.log('Request error:', error); // Print the error if one occurred
    console.log('Request statusCode:', response && response.statusCode); // Print the response status code if a response was received
    html = body;
});

const $ = cheerio.load(html);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});