var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
var request = require('request');

// Scrape data
router.get('/scrape', function() {
    console.log('Called');
    // Web page to scrape data from
    var pageToScrape = 'https://www.allmusic.com/';

    // Get html
    request(pageToScrape, function (error, response, html) {
        console.log('Request error:', error); // Print the error if one occurred
        console.log('Request statusCode:', response && response.statusCode); // Print the response status code if a response was received
        const $ = cheerio.load(html);
        res.render(html);
    });
})

// module.exports = router;