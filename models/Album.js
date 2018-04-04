var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    artist: {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    album: {
        siteId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        summary: {
            type: String,
            required: true
        }
    }
});

var Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;