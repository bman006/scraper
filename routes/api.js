// Require npm stuff
var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
var request = require('request');

// Require customer javascript
var Scraper = require('../scripts/scraperStuff');

module.exports = function(app, db) {
    // Scrape data from site
app.get('/scrape', function(req, response) {
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
            var artistName  = $(element).find('div.artist').children('a').text();
            var artistUrl   = $(element).find('div.artist').children('a').attr('href');
            var albumId     = $(element).find('div.title').children('a').attr('data-tooltip');
                albumId     = JSON.parse(albumId);
            var albumName   = $(element).find('div.title').children('a').text();
            var albumUrl    = $(element).find('div.title').children('a').attr('href');
            var genre       = $(element).find('div.genres').text();
                genre       = Scraper.genreCleaner(genre);
            var rating      = $(element).find('span.allmusic-rating').attr('class');
                rating      = Scraper.ratingGetter(rating);
            var summary     = $(element).find('div.headline-review').text().trim();
            // Get rid of excess characters in summary string with some code here

            // Add info to object to prep for database storage
            results.push({
                artist: {
                    name:   artistName,
                    url:    artistUrl
                },
                album: {
                    siteId: albumId.id,
                    name:   albumName,
                    url:    albumUrl,
                    genre:  genre,
                    rating: rating,
                    summary: summary
                }
            });
        });

        // Save data to MongoDB
        db.Album.create(results).then(function(album) {
            console.log(article);
        }).catch(function(err) {
            return res.json(err)
        })
        response.end();
    });
});

}