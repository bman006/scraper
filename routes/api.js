// Require npm stuff
var express = require('express');
const cheerio = require('cheerio');
var request = require('request');

// Require models for database
var db = require("../models");


// Require customer javascript
var Scraper = require('../scripts/scraperStuff');

module.exports = function(app, db) {
    // Scrape data from site
app.get('/scrape', function(req, res) {
    // Web page to scrape data from
    var pageToScrape = 'https://www.allmusic.com/';

    // Get html
    request(pageToScrape, function (error, response, html) {
        console.log('Request error:', error); // Print the error if one occurred
        console.log('Request statusCode:', response && response.statusCode); // Print the response status code if a response was received
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
            // var albumImage  = $(element).find('img.lazy').attr('src');
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
                    // image:  albumImage,
                    genre:  genre,
                    rating: rating,
                    summary: summary
                }
            });
        });

        // Get all id's currently in database
        var databaseIds = db.Album.find({}, 'album.siteId', function(err, databaseIds) {
            if (err) return handleError(err);

            // get rid of duplicate entries
            results = Scraper.checkForDuplicates(databaseIds, results);
            
            var resultCount = results.length;
            
            // Save data to MongoDB
            db.Album.create(results).then(function(album) {
                console.log(article);
            }).catch(function(err) {
                return res.json(err)
            })
        });


        res.json({resultCount: resultCount});
    });
});

}