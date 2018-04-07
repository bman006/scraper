$(document).ready(function() {
    // Modal functionality
    var modal   = $('#myModal');
    var btn     = $('#scraper-button');
    var span    = $('.close')[0]
    
    // When the user clicks on <span> (x), close the modal
    $('span').click(function() {
        modal.css('display', 'none');
    });
    
    // When the user clicks anywhere outside of the modal, close it
    $('.modal').click(function() {
        modal.css('display', 'none');
    });
    
    // Trigger scrape from website
    $('#scrape-button').click(function() {
        // $.get('/scrape', function(req, res) {
            // var resultCount = res.body;
            var resultCount = 5;
            $('#modal-text').text(`${resultCount} new albums scraped`);
            console.log(modal);
            modal.css('display', 'block');
    
        // });
    });
});