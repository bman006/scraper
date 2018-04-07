// Require npm stuff
var express = require('express');
var exphbs  = require('express-handlebars');

// Require models for database
var db = require("../models");

module.exports = function(app, db) {

    app.get('/', function(req, res) {
        // Get data from mongo
        db.Album.find({}, function(err, albums) {

            console.log(`Stuff here: ${albums[0]}`);
            var hbsobj = {
                albums: albums
            }
            res.render('index', hbsobj);
        });
    });

}