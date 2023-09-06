$.ajaxSetup({
    headers: {
        'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val()
    }
});

$(document).ready(function () {
    $('#dashboardForm').on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: new FormData(this),
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.redirect_url) {
                    window.location.href = data.redirect_url;
                } else {
                    console.error("Expected redirect_url in the server response, but it was not provided.");
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });
});