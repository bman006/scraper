console.log('helloooooo');
var Scraper = {
    genreCleaner: function(raw) {
        // Get rid of linebreak
        raw = raw.slice(2);
        // Get rid of excess spaces
        raw = raw.trim();

        return raw
    },
    ratingGetter: function(raw) {
        raw = raw.slice(raw.length-1);

        return raw
    }
}

module.exports = Scraper;