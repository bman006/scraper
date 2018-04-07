$(document).ready(function() {

    // Submit comment for an album
    $('.submit-comment').click(function() {
        var box = $(this).closest('.album-container').find('.comments');
        var comment = box.val();
        box.val('');
    })

})