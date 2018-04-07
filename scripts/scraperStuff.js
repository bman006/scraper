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
        raw = Number(raw);
        return raw
    },
    // Change database ID to a simple array
    convertToIds: function(dbData) {
        var newArray = [];
        for (var i = 0; i < dbData.length; i++) {
            newArray.push(dbData[i].album.siteId)
        }
        return newArray
    },
    // Check the existing database and new scraped data for duplicate albums
    checkForDuplicates: function(databaseIds, scrapedIds) {
        // Create array to store the finalized group of data to store in Mongo
        var newResults = [];
        databaseIds = Scraper.convertToIds(databaseIds);

        // Check for duplicates between new data and Mongo DB data
        // Loop for each scraped record
        scrapedIds.forEach(element => {
            // Loop for each data record from Mongo
                if (databaseIds.includes(element.album.siteId) === false) {
                    newResults.push(element);
                }
        });
        
        return newResults
    }
}

module.exports = Scraper;