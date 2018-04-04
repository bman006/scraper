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

// Require routes
require("./routes");
// app.use(routes);

// Connect to Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/scraperdb'
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});


// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes

// Scrape data from site
app.get('/scrape', function() {
    // Web page to scrape data from
    var pageToScrape = 'https://www.allmusic.com/';

    // Get html
    request(pageToScrape, function (error, res, html) {
        console.log('Request error:', error); // Print the error if one occurred
        console.log('Request statusCode:', res && res.statusCode); // Print the response status code if a response was received
        const $ = cheerio.load(html);

        // Save info from html (headline, summary, url)
        var results = [];

        $('.release-container').each(function(i, element) {
            var album = $(element).find('div.title').children('a').text();
            results.push({
                album: album
            })
        });
        console.log(results);
        // Save data to MongoDB

    });
})





app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});