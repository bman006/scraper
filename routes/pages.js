// Require npm stuff
var express = require('express');
var exphbs  = require('express-handlebars');

// Require models for database
var db = require("../models");

module.exports = function(app, db) {

    app.get('/', function(req, res) {
        // Get data from mongo
        db.Album.find({}, function(err, albums) {

            var hbsobj = {
                album: albums
            }
            res.render('index', hbsobj);
        });
    });
}